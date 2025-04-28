import { Request, Response } from "express";
import morgan from "morgan";
import { logger } from "../utils/logger.js";

export const loggerMiddleware = morgan(
  (tokens, req: Request, res: Response) => {
    const logObject = {
      method: tokens.method(req, res),
      url: tokens.url(req, res),
      status: tokens.status(req, res),
      responseTime: `${tokens["response-time"](req, res)} ms`,
      userAgent: req.headers["user-agent"],
      ip: req.ip,
      timestamp: new Date().toISOString(),
    };

    if (res.statusCode >= 500) {
      logger.error(
        `${logObject.method} ${logObject.url} ${logObject.status} - ${logObject.responseTime}`,
        logObject
      );
    } else if (res.statusCode >= 400) {
      logger.warn(
        `${logObject.method} ${logObject.url} ${logObject.status} - ${logObject.responseTime}`,
        logObject
      );
    } else {
      logger.info(
        `${logObject.method} ${logObject.url} ${logObject.status} - ${logObject.responseTime}`,
        logObject
      );
    }

    return null;
  }
);
