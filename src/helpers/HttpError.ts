const errorMessageList: { [key: number]: string } = {
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not Found",
  409: "Conflict",
};

export default class HttpError extends Error {
  status: number;

  constructor(status: number, message?: string) {
    const defaultMessage = errorMessageList[status] || "Unknown Error";
    super(message || defaultMessage);

    this.status = status;

    Object.setPrototypeOf(this, HttpError.prototype);
  }
}
