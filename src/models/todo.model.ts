import { Schema, model } from "mongoose";
import { ITodo } from "../todo/Todo.types";
import { handleMongooseError } from "../helpers/handleMongooseError";

const todoSchema = new Schema<ITodo>(
  {
    title: { type: String, required: [true, "Title is required"] },
    description: { type: String },
  },
  { versionKey: false, timestamps: true }
);

todoSchema.post("save", handleMongooseError);

export const TodoModel = model<ITodo>("Todo", todoSchema);
