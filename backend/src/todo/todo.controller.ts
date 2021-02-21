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
  Query
} from "tsoa";

// Firebase
import { firestoreDB } from "./../firebase";

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

  @Post("")
  public async create(
    @Query() description: string
  ): Promise<string> {
    try {
      this.setStatus(200);
      await firestoreDB.collection("cities").doc("LA").set({
        name: "test",
        description,
      });
      return description;
    } catch (error) {
      this.setStatus(500);
      console.error("Caught error", error);
    }
  }

  @Put("/{id}")
  public async update(
    id: string,
    @BodyProp("description") description: string
  ): Promise<string> {
    return description;
  }
  @SuccessResponse("201", "TEST!")
  @Delete("/{id}")
  public async remove(id: string): Promise<{ deleted: string }> {
    this.setStatus(201);
    return {
      deleted: id,
    };
  }
}
