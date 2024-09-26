"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoModel = void 0;
const mongoose_1 = require("mongoose");
const handleMongooseError_1 = require("helpers/handleMongooseError");
const todoSchema = new mongoose_1.Schema({
    id: { type: Number, required: true, unique: true },
    title: { type: String, required: [true, "Title is required"] },
    description: { type: String },
});
todoSchema.post("save", handleMongooseError_1.handleMongooseError);
exports.TodoModel = (0, mongoose_1.model)("Todo", todoSchema);
//# sourceMappingURL=todo.model.js.map