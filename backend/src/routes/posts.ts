import Router from "express";
import controller from "../controllers/index.ts";
import { isAdmin } from "../../utils/adminAuth.ts";

const router = Router();

router.get("/", controller.get.posts);
router.post("/", isAdmin, ...controller.post.post);

router.get("/:postId", controller.get.post);
router.put("/:postId", isAdmin, controller.put.post);
router.delete("/:postId", isAdmin, controller.del.post);

router.get("/:postId/comments", controller.get.comments);

router.get("/:postId/comments/:commentId", controller.get.comment);
router.put("/:postId/comments/:commentId", controller.put.comment);
router.delete("/:postId/comments/:commentId", controller.del.comment);

export default router;
