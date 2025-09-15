import {Router} from "express";
import * as userController from "../controllers/user.controller";
import {protectRoute} from "../middleware/auth.middleware";

const router = Router();

router.get('/profile/:username', userController.getUserProfile);
router.post("/sync", protectRoute, userController.syncUser);
router.post("/me", protectRoute, userController.getCurrentUser);
router.put("/profile", protectRoute, userController.updateProfile);
router.put("/follow/:targetUserId", protectRoute, userController.followUser);

export default router;