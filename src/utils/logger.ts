import { createLogger, format, transports } from "winston";
const { combine, colorize, timestamp, json, printf, prettyPrint, errors } =
  format;

const consoleLogFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} [${level}]: ${stack || message}`;
});

export const logger = createLogger({
  level: "debug",
  format: combine(errors({ stack: true }), timestamp(), json(), prettyPrint()),
  transports: [
    new transports.Console({
      format: combine(colorize(), consoleLogFormat),
    }),
    new transports.File({ filename: "logs/app.log" }),
  ],
});
