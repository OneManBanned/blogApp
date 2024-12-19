import { Router } from "express";
import add from "../controllers/addController.js";

const addRoute = Router()

addRoute.get("/", add.get)

export default addRoute;
