import { Router } from "express";
import controller from "../controllers/registerController.ts"
import { ValidationChain } from "express-validator";

const router = Router();

router.post("/", ...controller.user)

export default router;
