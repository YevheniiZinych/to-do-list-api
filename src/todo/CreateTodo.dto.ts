import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from "class-validator";

export class TodoDTO {
  @IsString()
  @IsNotEmpty({ message: "Title is required" })
  @Length(1, 100, { message: "Title must be between 1 and 100 characters" })
  title!: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(["ToDo", "In Progress", "Done"], {
    message: "Status must be one of 'ToDo', 'In Progress', or 'Done'",
  })
  status!: "ToDo" | "In Progress" | "Done";
}
