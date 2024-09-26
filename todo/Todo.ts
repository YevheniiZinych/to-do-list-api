import {
  JsonController,
  Get,
  Post,
  Delete,
  Put,
  Body,
  Param,
} from "routing-controllers";

import { ITodo } from "./Todo.types";

const storeData: ITodo[] = [
  {
    id: 20,
    title: "Hello",
    description: "Hello",
  },
];

@JsonController("/todo")
export default class Todo {
  @Get()
  async getAll() {
    return storeData;
  }

  @Get("/:id")
  async getOne(@Param("id") id: number): Promise<ITodo | {}> {
    const person = storeData.find((item) => {
      return item.id === id;
    });

    return person || {};
  }

  @Post()
  async setPerson(@Body() body: ITodo) {
    storeData.push(body);

    return true;
  }

  @Put()
  async updateTodo(@Body() body: ITodo) {
    storeData.push(body);

    return true;
  }

  @Delete()
  async deleTodo(@Body() body: ITodo) {
    storeData.push(body);

    return true;
  }
}
