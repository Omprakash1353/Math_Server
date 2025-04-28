import { ErrorRequestHandler, NextFunction, Request, Response } from "express";

export const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(404).json({
    error: "Not Found",
    message: "The requested resource could not be found.",
  });
};

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err);

  if (process.env.NODE_ENV === "development") {
    res.status(500).json({
      error: "Internal Server Error",
      message: err.message,
      stack: err.stack,
    });
  }

  res.status(500).json({
    error: "Internal Server Error",
    message: "Something went wrong. Please try again later.",
  });
};
