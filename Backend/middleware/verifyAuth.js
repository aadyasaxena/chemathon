import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import dotenv from "dotenv";

dotenv.config();

const checkAdminRole = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "Authorization token is required" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({ email: decoded.email });
    if (!user) {
      return res.status(404).json({ error: "User not found in the database." });
    }

    if (decoded.role !== "admin") {
      console.log("Access denied. You are not an admin.");
      return res
        .status(403)
        .json({ error: "Access denied. You are not an admin." });
    }

    req.user = decoded;
    next();
  } catch (err) {
    console.error("Token verification failed:", err.message);
    return res
      .status(401)
      .json({ error: "Invalid token or token verification failed" });
  }
};

export default checkAdminRole;
