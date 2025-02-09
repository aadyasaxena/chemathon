import express from "express";
import authenticateFirebaseUser from "../middleware/Auth.js";
import { User } from "../models/usermodel.js";
import jwt from "jsonwebtoken";

const routerUser = express.Router();

// Registration route
routerUser.post("/register", async (req, res) => {
  const { email, name, mobile, university, option } = req.body;

  console.log("Received registration request:", req.body); // Log request body

  if (!email || !name || !mobile || !university || !option) {
    return res
      .status(400)
      .json({ message: "All fields are required", req: req.body });
  }

  const regIndex = name.lastIndexOf(" ");
  const firstName = name.slice(0, regIndex);
  const regNo = name.slice(regIndex + 1);

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res
        .status(400)
        .json({ message: "Email already exists.", req: req.body });
    }

    const newUser = new User({
      name: firstName,
      regNo: regNo,
      email: email,
      mobile: mobile,
      university: university,
      option: option,
    });

    await newUser.save();

    res
      .status(201)
      .json({ message: "User registered successfully", req: req.body });
  } catch (err) {
    console.error("Error registering user:", err);
    res.status(500).json({ message: "Internal server error", req: req.body });
  }
});

// Login route
routerUser.post("/login", authenticateFirebaseUser, async (req, res) => {
  const { email, name } = req.user;

  if (!email || !name) {
    return res.status(400).json({ message: "Email and name are required" });
  }

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found. Please register." });
    }

    const token = jwt.sign(user.toObject(), process.env.JWT_SECRET);
    console.log(token);
    return res.status(200).json({ token, message: "Logged in successfully" });
  } catch (err) {
    console.error("Error logging in user:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default routerUser;
