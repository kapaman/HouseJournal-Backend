import type { ErrorRequestHandler, RequestHandler } from "express";

export const errHandler = ((err, _req, res, _next) => {
  let statusCode = res.statusCode || 500;
  if (statusCode == 200) {
    statusCode = 500;
  }
  res.status(statusCode).json({
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    message: err.message ? err.message : "Internal Server Error",
  });
}) as ErrorRequestHandler;

export const notFound = ((req, res, next) => {
  const error = new Error("Page not found " + req.originalUrl);
  res.status(404);
  next(error);
}) as RequestHandler;
