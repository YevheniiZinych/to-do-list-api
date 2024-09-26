import { Schema, model } from "mongoose";
import { ITodo } from "app/domain/todo/Todo.types";
import { handleMongooseError } from "helpers/handleMongooseError";

const todoSchema = new Schema<ITodo>({
  id: { type: Number, required: true, unique: true },
  title: { type: String, required: [true, "Title is required"] },
  description: { type: String },
});

todoSchema.post("save", handleMongooseError);

export const TodoModel = model<ITodo>("Todo", todoSchema);
