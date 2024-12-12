import Router from "express";
import controller from "../controllers/postControllers.ts"

const router  = Router();

router.get("/", controller.getPosts)
router.get("/:postId", controller.getPost)
router.get("/:postId/comments", controller.getComments)
router.get("/:postId/comments/:commentId", controller.getComment)

export default router
