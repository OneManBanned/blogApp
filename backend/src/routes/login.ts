import { Router } from "express";
import controller from "../controllers/loginController.ts";

const router = Router();

router.post("/", controller.login as any);

export default router;
