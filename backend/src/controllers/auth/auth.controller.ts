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
  Query,
} from "tsoa";

// Functions
import { FirebaseSignUp } from "./auth.functions";

// Types
import { ErrorSchema, UserSchema } from "./auth.schema";
// Utils
@Route("auth")
export class AuthController extends Controller {
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
      const user = await FirebaseSignUp(email, password);
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
