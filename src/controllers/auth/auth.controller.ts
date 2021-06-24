import {
  Route,
  Controller,
  Post,
  Example,
  Query,
  Header,
  Request,
  Security,
} from "tsoa";

// Services
import { AuthService } from "./authService";

// Types
import { ErrorSchema } from "./auth.schema";
import { FormattedUser } from "../../firebase";
import { userFormatter } from "../../utils/user.formatter";
// Utils
@Route("auth")
export class AuthController extends Controller {
  /**
   *   User registration by email and password
   *
   */
  @Example({
    email: "test@gmail.com",
    password: "pas34Wo",
  })
  @Post("/signup")
  public async signup(
    @Query() email: string,
    @Query() password: string
  ): Promise<FormattedUser> {
    try {
      const user = await new AuthService().signup(email, password);
      if (user) {
        this.setStatus(201);
        return userFormatter(user);
      } else {
        this.setStatus(500);
      }
    } catch (error) {
      this.setStatus(400);
      return error;
    }
  }

  /**
   * Authorization of the user by email and password
   *
   */
  @Example({
    email: "test@gmail.com",
    password: "pas34Wo",
  })
  @Post("/")
  public async signin(
    @Query() email: string,
    @Query() password: string
  ): Promise<FormattedUser> {
    try {
      const { user, token } = await new AuthService().signin(email, password);
      if (user && token) {
        this.setStatus(201);
        return {
          ...userFormatter(user),
          accessToken: token,
        };
      } else {
        this.setStatus(500);
      }
    } catch (error) {
      this.setStatus(400);
      return error;
    }
  }

  @Security("api_key")
  @Post("/me")
  public async me(
    @Header("Authorization")
    access_token?: string,
    @Header("Refreshtoken")
    refresh_token?: string,
    @Request() request?: any
  ): Promise<FormattedUser | ErrorSchema> {
    try {
      const accessToken = access_token ?? request?.query?.access_token;
      const refreshToken = refresh_token ?? request?.query?.refresh_token;
      if (!accessToken || !refreshToken) {
        this.setStatus(400);
        return {
          message: "access or refresh token not provided",
          code: "400",
        };
      }
      const user = await new AuthService().me(accessToken, refreshToken);

      if (user) {
        this.setStatus(200);
        return userFormatter(user);
      } else {
        this.setStatus(500);
        return {
          message: "unresolved",
          code: "500",
        };
      }
    } catch (error) {
      this.setStatus(400);
      return error;
    }
  }

  @Security("api_key")
  @Post("/refresh")
  public async refresh(
    @Header("Refreshtoken")
    token?: string,
    @Request() request?: any
  ): Promise<string> {
    try {
      const access_token = token ?? request?.query?.refresh_token;
      const newToken = await new AuthService().refresh(access_token);
      if (newToken) {
        this.setStatus(200);
        return newToken;
      } else {
        this.setStatus(500);
      }
    } catch (error) {
      this.setStatus(401);
      return error;
    }
  }
}
