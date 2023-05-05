import express from "express";
import {
  createUser,
  getAllUsers,
  updateUserById,
  deleteUserById,
  registerUser,
  loginUser,
} from "../controllers/userController.js";
const router = express.Router();

import { isAdmin } from "../middleware/authMiddleware.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

router.post("/create", createUser);
router.get("/getAll", authenticateToken, getAllUsers);
router.put("/update/:userId", authenticateToken, isAdmin, updateUserById);
router.delete("/delete/:userId", authenticateToken, isAdmin, deleteUserById);

router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;
