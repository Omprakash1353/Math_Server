import { config } from "dotenv";
import { Options } from "swagger-jsdoc";

config({ path: ".env" });

export const swaggerConfigurationOptions: Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Math Operation API",
      version: "1.0.0",
      description: "API for mathematical operations",
    },
    servers: [
      {
        url: process.env.BASE_URL,
        description: "Server",
      },
    ],
  },
  apis: ["./src/routes/*.ts"],
};
