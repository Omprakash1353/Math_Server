import { config } from "dotenv";
import express from "express";
import { dirname, join } from "path";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { fileURLToPath } from "url";
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

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(loggerMiddleware);

app.use(express.static(join(__dirname, "..", "public")));

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
