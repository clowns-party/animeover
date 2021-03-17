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
import { UserSchema } from "../auth/auth.schema";

// Services
import { UserService } from "./userService";

// Utils
@Route("user")
export class UserController extends Controller {
  /**
   *   User update fields
   *
   */
  @Example({
    token: "token",
    displayName: "name",
    photoURL: "https://some.jpg",
  })
  @Put("/update")
  public async userUpdate(
    @Query() token: string,
    @Query() displayName?: string,
    @Query() photoURL?: string
  ): Promise<UserSchema> {
    try {
      const fields = {
        displayName,
        photoURL,
      };
      const user = await new UserService().update(token, fields);
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
