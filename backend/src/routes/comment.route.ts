import {Router} from "express";
import {protectRoute} from "../middleware/auth.middleware";
import upload from "../middleware/upload.middleware";
import * as commentController from "../controllers/comment.controller";
const router = Router();

router.route("/post/:postId")
    .get( commentController.getComment)
    .post(protectRoute, commentController.createComment);

router.delete("/commentId", protectRoute, commentController.deleteComment);

export default router;