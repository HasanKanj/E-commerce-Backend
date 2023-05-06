import express from "express";

import testimonialController from "../controllers/testimonialsController.js";

const router = express.Router();
import { isAdmin } from '../middleware/authMiddleware.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

router.route("/").get(testimonialController.getAll);
router.route("/add").post(authenticateToken,isAdmin,testimonialController.addTestimonial);
router.route("/:id").get(testimonialController.getOne);
router.route("/:id").delete(authenticateToken,isAdmin,testimonialController.deleteTestimonial);
router.route("/:id").put(testimonialController.editTestimonial);

export default router;
