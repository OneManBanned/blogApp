import Router from "express";
import controller from "../controllers/index.ts"

const router  = Router();

router.get("/", controller.get.posts)
router.post("/", controller.post.post)

router.get("/:postId", controller.get.post)
router.post("/:postId", controller.put.post)
router.delete("/:postId", controller.del.post)

router.get("/:postId/comments", controller.get.comments)

router.get("/:postId/comments/:commentId", controller.get.comment)
router.put("/:postId/comments/:commentId", controller.put.comment)
router.delete("/:postId/comments/:commentId", controller.del.comment)

export default router
