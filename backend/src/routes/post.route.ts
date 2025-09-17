import {Router} from "express";
import {protectRoute} from "../middleware/auth.middleware";
import * as postController from "../controllers/post.controller";
import upload from "../middleware/upload.middleware";
const router = Router();

router.get("/user/:username", postController.getUserPosts);

router.route('/')
    .get(postController.getPosts)
    .post(protectRoute, upload.single('image'), postController.createPost);

router.route("/:postId")
    .get(postController.getPosts)
    .delete(protectRoute, postController.deletePost);

router.post("/:postId/like", postController.likePost);
export default router;