import {
  Route,
  Get,
  Controller,
  Post,
  BodyProp,
  Put,
  Delete,
  SuccessResponse,
} from "tsoa";

@Route("/todo")
export class TodoController extends Controller {
  @Get("/")
  public async getAll(): Promise<any[]> {
    try {
      return ["some item!"];
    } catch (err) {
      this.setStatus(500);
      console.error("Caught error", err);
    }
  }

  @Post("/")
  public async create(
    @BodyProp("description") description: string
  ): Promise<string> {
    return description
  }

  @Put("/{id}")
  public async update(
    id: string,
    @BodyProp("description") description: string
  ): Promise<string> {
    return description
  }
  @SuccessResponse("201", "TEST!")
  @Delete("/{id}")
  public async remove(id: string): Promise<{deleted: string}> {
    this.setStatus(201);
    return {
      deleted: id
    }
  }
}