import { config } from "dotenv";
import express from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import {
  errorHandler,
  notFoundHandler,
} from "./middlewares/error.middleware.js";
import { loggerMiddleware } from "./middlewares/logger.middleware.js";
import mathRoutes from "./routes/math.route.js";
import { swaggerConfigurationOptions } from "./utils/swaggerOptions.js";

config({ path: ".env" });

const PORT = process.env.PORT || 3000;

const app = express();
const specs = swaggerJsdoc(swaggerConfigurationOptions);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(loggerMiddleware);

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);

app.use("/api", mathRoutes);

app.use(notFoundHandler);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

export default app;
