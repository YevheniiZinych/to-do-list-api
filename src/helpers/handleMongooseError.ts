export const handleMongooseError = (error: any, data: any, next: any) => {
  const { name, code } = error;

  const status = name === "MongoServerError" && code === 11000 ? 409 : 400;
  error.status = status;

  next();
};
