import express from "express";
import aboutController from "../controllers/aboutController.js";

const router = express.Router();
import { isAdmin } from "../middleware/authMiddleware.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

router.route("/").get(aboutController.getAbout);
router.route("/add").post(authenticateToken, isAdmin, aboutController.addAbout);
router.route("/:id").put(authenticateToken, isAdmin, aboutController.editAbout);
router
  .route("/:id")
  .delete(authenticateToken, isAdmin, aboutController.removeAbout);

export default router;
