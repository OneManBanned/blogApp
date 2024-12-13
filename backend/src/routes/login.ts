import { Router } from "express";
import controller from "../controllers/loginController.ts"

const router = Router();

router.post("/", controller.login)

export default router;
