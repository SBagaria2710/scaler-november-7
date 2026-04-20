import express from "express";
import { register, login, getCurrentUser, forgetPassword, resetPassword } from "../controllers/userController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.patch("/forgetpassword", forgetPassword);
router.patch("/resetpassword", resetPassword);
router.get("/me", authMiddleware, getCurrentUser);

export default router;