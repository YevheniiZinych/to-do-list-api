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

const storeData: ITodo[] = [
  {
    id: 20,
    title: "Hello!",
    description: "Hello",
  },
];

@JsonController("/todo")
export default class Todo {
  @Get()
  async getAll(@Res() response: any) {
    const todos = await TodoModel.find();

    if (!todos) {
      throw new HttpError(404);
    }

    return response.status(200).json(todos);
  }

  @Post("/create")
  async create(@Body() todos: ITodo, @Res() response: any) {
    const newTodo = await TodoModel.create({ ...todos });

    return response.status(201).json([newTodo]);
  }

  @Put("/:id")
  put(@Param("id") id: number, @Body() todos: {}) {
    return "Updating a user...";
  }

  @Delete("/:id")
  remove(@Param("id") id: number) {
    const index = storeData.findIndex((item) => item.id === id);
    console.log(index);
    storeData.splice(index, 1);
    console.log(storeData);
    return "Removing user...";
  }
}
