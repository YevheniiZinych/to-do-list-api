export interface ITodo {
  title: string;
  description?: string;
  status: "ToDo" | "In Progress" | "Done";
}
