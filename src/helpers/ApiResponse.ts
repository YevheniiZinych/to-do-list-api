export class ApiResponse<T> {
  constructor(
    public success: boolean,
    public status: number,
    public data: T,
    public message?: string
  ) {}
}
