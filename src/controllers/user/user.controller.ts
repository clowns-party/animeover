import {
  Route,
  Controller,
  Put,
  Example,
  Query,
  Security,
  Header,
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
    displayName: "name",
    photoURL: "https://some.jpg",
  })
  @Security("api_key")
  @Put("/update")
  public async userUpdate(
    @Header("Authorization")
    access_token?: string,
    @Header("Refreshtoken")
    refresh_token?: string,
    @Query() displayName?: string,
    @Query() photoURL?: string
  ): Promise<UserSchema> {
    try {
      const fields = {
        displayName,
        photoURL,
      };
      const user = await new UserService().update(
        access_token,
        refresh_token,
        fields
      );
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
