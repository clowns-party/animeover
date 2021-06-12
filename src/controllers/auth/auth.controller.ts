import {
  Route,
  Get,
  Controller,
  Post,
  BodyProp,
  Put,
  Delete,
  SuccessResponse,
  Path,
  Body,
  Example,
  Response,
  Query,
  Header,
  Request,
  Security,
} from "tsoa";

// Services
import { AuthService } from "./authService";

// Types
import { ErrorSchema, UserSchema } from "./auth.schema";
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
  ): Promise<UserSchema | ErrorSchema> {
    try {
      const user = await new AuthService().signup(email, password);
      if (user) {
        this.setStatus(201);
        return user;
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
  ): Promise<{ user: UserSchema; token: string } | ErrorSchema> {
    try {
      const { user, token } = await new AuthService().signin(email, password);
      if (user && token) {
        this.setStatus(201);
        return {
          user,
          token,
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
    token?: string,
    @Request() request?: any
  ): Promise<UserSchema | ErrorSchema> {
    try {
      const access_token = token ?? request?.query?.access_token;
      const user = await new AuthService().me(access_token);
      if (user) {
        this.setStatus(201);
        return user;
      } else {
        this.setStatus(500);
      }
    } catch (error) {
      this.setStatus(400);
      return error;
    }
  }
}
