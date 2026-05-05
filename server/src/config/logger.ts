import morgan from "morgan";
import { envVars } from "./env.js";


const logger = envVars.NODE_ENV === "production" ? morgan("combined") : morgan("dev");

export { logger };
