import { ErrorRequestHandler } from "express";

const globalErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next
) => {
  const statusCode = (err as any).statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || "Something went wrong",
    errorDetails: err,
  });
};

export default globalErrorHandler;
