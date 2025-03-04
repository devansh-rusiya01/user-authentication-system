import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";
import protect from "../middlewares/authMiddleware.js";
import { sendResetEmail, resetPassword } from "../controllers/passwordResetController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/protected",protect, (req, res) => {
    res.json({ message: "Access granted!", user: req.user });
});
// Route to request password reset
router.post("/forgot-password", sendResetEmail);

// Route to reset password
router.post("/reset-password/:token", resetPassword);

export default router;
