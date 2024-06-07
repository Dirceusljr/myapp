import { Router } from "express";
import { registerRoutes } from "./routes.js";

const router = Router();

router.use('/product', registerRoutes)

export { router };