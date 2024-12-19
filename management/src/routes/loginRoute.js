import { Router } from "express";
import login from "../controllers/loginController.js";

const loginRoute = Router()

loginRoute.get("/", login.get)

export default loginRoute;
