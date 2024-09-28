import {
  JsonController,
  Get,
  Post,
  Delete,
  Put,
  Body,
  Param,
  Res,
} from "routing-controllers";
import { ITodo } from "./Todo.types";
import HttpError from "../helpers/HttpError";
import { TodoModel } from "../models/todo.model";

@JsonController()
export default class Todo {
  @Get("/todo")
  async getAll(@Res() response: any) {
    const todos = await TodoModel.find();

    if (!todos) {
      throw new HttpError(404);
    }

    return response.status(200).json(todos);
  }

  @Post("/todo/create")
  async create(@Body() todos: ITodo, @Res() response: any) {
    const newTodo = await TodoModel.create({ ...todos });

    return response.status(201).json([newTodo]);
  }

  @Put("/todo/:id")
  async update(
    @Param("id") id: string,
    @Body() data: {},
    @Res() response: any
  ) {
    // if l wont see new object, need add { new: true }, otherwise l will see old contact
    const result = await TodoModel.findByIdAndUpdate(id, data, {
      new: true,
    });

    if (!result) {
      throw new HttpError(404);
    }

    response.status(200).json(result);
  }

  @Delete("/todo/:id")
  async remove(@Param("id") id: number, @Res() response: any) {
    const result = await TodoModel.findByIdAndDelete(id);

    if (!result) {
      throw new HttpError(404);
    }

    response.json([{ message: "Delete success", deleted_todo: result }]);
  }
}
