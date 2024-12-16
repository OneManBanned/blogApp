import { Router } from "express";
import controller from "../controllers/registerController.ts"

const router = Router();

router.post("/", controller.user as any)

export default router;
