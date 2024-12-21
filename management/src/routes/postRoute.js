import { Router } from "express";
import post from "../controllers/postController.js";

const addRoute = Router()

addRoute.get("/", post.add)
addRoute.get("/:id", post.edit)

export default addRoute;
