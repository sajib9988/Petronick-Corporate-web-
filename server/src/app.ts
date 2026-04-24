import cookieParser from "cookie-parser";
import express, { Application, Request, Response } from "express";
import helmet from "helmet";
import qs from "qs";
import { cors } from "./config/cors";
import { logger } from "./config/logger";
import { limiter } from "./config/rate-limit";
import { apiRoutes } from "./routes";
import { globalErrorHandler } from "./shared/middlewares/error.middleware";
import { notFound } from "./shared/middlewares/not-found.middleware";


import path from "path";

// app initialization
const app: Application = express();

// app settings
app.set("query parser", (str: string) => qs.parse(str));
app.set("view engine", "ejs");
const isProd = process.env.NODE_ENV === "production";

app.set(
  "views",
  isProd
    ? path.resolve(__dirname, "templates")
    : path.resolve(process.cwd(), "src/templates")
);

// middlewares
app.use(express.json());
app.use(helmet());
app.use(logger);
app.use(cors);
app.use(limiter);
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// trust proxy when behind proxies (load balancers)
if (process.env.NODE_ENV === "production") {
  app.set("trust proxy", 1);
}

// Home page route
app.get("/", (_req: Request, res: Response) => {
  res.status(200).json({
    title: "Welcome to your Express app",
   
  });
});



app.use("/api/v1", apiRoutes);


app.use(notFound);


app.use(globalErrorHandler);

export { app };
