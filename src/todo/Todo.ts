import {
  JsonController,
  Get,
  Post,
  Delete,
  Put,
  Res,
  Body,
  Param,
} from "routing-controllers";
import { validateOrReject } from "class-validator";
import { TodoDTO } from "./CreateTodo.dto";
import { ApiError } from "../helpers/ApiError";
import { ApiResponse } from "../helpers/ApiResponse";
import { TodoModel } from "../models/todo.model";

@JsonController()
export default class Todo {
  @Get("/todo")
  async getAll() {
    const todos = await TodoModel.find().lean();

    if (!todos) {
      throw new ApiError(404, {
        code: "TODO_NOT_FOUND",
      });
    }

    const todosWithId = todos.map((todo: any) => ({
      ...todo,
      id: todo._id.toString(),
    }));

    return new ApiResponse(true, 200, todosWithId);
  }

  @Post("/todo/create")
  async setTodo(@Body() todo: TodoDTO, @Res() response: any) {
    await validateOrReject(todo);

    const newTodo = await TodoModel.create({ ...todo });

    return response.status(201).json([newTodo]);
  }

  @Put("/todo/:id")
  async updateTodo(@Param("id") id: string, @Body() data: {}) {
    // if l wont see new object, need add { new: true }, otherwise l will see old contact
    const result = await TodoModel.findByIdAndUpdate(id, data, {
      new: true,
    });

    if (!result) {
      throw new ApiError(404, {
        code: "BAD_REQUEST",
      });
    }

    return new ApiResponse(true, 201, result);
  }

  @Delete("/todo/:id")
  async removeTodo(@Param("id") id: string) {
    const result = await TodoModel.findByIdAndDelete(id);

    if (!result) {
      throw new ApiError(404, {
        code: "TODO_NOT_FOUND",
      });
    }

    return new ApiResponse(true, 200, result);
  }
}
