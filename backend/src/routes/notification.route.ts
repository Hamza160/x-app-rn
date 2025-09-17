import {Router} from "express";
import {protectRoute} from "../middleware/auth.middleware";
import * as notificationController from "../controllers/notification.controller";

const router = Router();

router.get('/', protectRoute, notificationController.getNotifications);
router.get('/:notificationId', protectRoute, notificationController.deleteNotifications);

export default router;