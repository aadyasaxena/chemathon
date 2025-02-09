import express from "express";
import { User } from "../models/usermodel.js";
import authenticateAPIUser from "../middleware/JWTauth.js";
const router = express.Router();

router.post("/dashboard", authenticateAPIUser(["admin"]), async (req, res) => {
  res.status(200).json({
    message: "Welcome to the admin dashboard!",
  });
});

router.post(
  "/manage_admin",
  authenticateAPIUser(["admin"]),
  async (req, res) => {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required." });
    }

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }
      user.role = "admin";
      await user.save();

      res
        .status(200)
        .json({ message: `User role updated to admin successfully.` });
    } catch (error) {
      console.error("Error updating user role:", error);
      res
        .status(500)
        .json({ message: "An error occurred while updating the role." });
    }
  }
);

export default router;
