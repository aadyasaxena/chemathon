import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    regNo: {
      type: String,
      required: true,
      unique: true,
    },
    teamName: {
      type: String,
      ref: "Team",
      default: null,
    },
    role: {
      type: String,
      enum: ["member", "leader", "admin"],
      default: "leader",
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", userSchema);
