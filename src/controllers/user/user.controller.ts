import { Route, Controller, Put, Example, Query, Security, Header } from "tsoa";
import { FormattedUser } from "../../firebase";
import { userFormatter } from "../../utils/user.formatter";

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
  ): Promise<FormattedUser> {
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
        this.setStatus(200);
        return {
          ...userFormatter(user),
          accessToken: access_token,
          refreshToken: refresh_token,
        };
      } else {
        this.setStatus(500);
      }
    } catch (error) {
      this.setStatus(400);
      return error;
    }
  }
}
