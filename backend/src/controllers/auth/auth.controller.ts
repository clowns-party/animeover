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
      const user = new AuthService().signup(email, password);
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
  ): Promise<UserSchema | ErrorSchema> {
    try {
      const user = new AuthService().signin(email, password);
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
