import express from "express";

import authenticateFirebaseUser from "../middleware/googleAuth.js";
import {User} from "../models/userModel.js";
import jwt from "jsonwebtoken";
const routerUser = express.Router();

routerUser.post("/login", authenticateFirebaseUser, async (req, res) => {
    const { email, name } = req.user;
    if (!email || !name) {
        return res.status(400).json({ message: "Email and name are required" });
    }
    const regIndex = name.lastIndexOf(" ");
    const firstName = name.slice(0, regIndex);
    const reg = name.slice(regIndex + 1);
    try {
        let user = await User.findOne({ email });
        if (!user) {
            user = new User({name: firstName, regNo: reg, email: email});
            await user.save();
        }
        const token=jwt.sign(user.toObject(),process.env.JWT_SECRET);
        console.log(token)
        return res.status(200).json({token, message: "Logged in successfully"});
    } catch (err) {
        console.error("Error logging in user:", err);
        res.status(500).json({ message: "Internal server error" });
    }
});


routerUser.post("/selectRole", authenticateFirebaseUser, async (req, res) => {
    const { email, newRole } = req.body;

    if (!email || !newRole) {
        return res.status(400).json({ message: "Email and role are required" });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.role = newRole;
        await user.save();
        const token=jwt.sign(user.toObject(),process.env.JWT_SECRET);
        return res.status(201).send(token);
    } catch (err) {
        console.error("Error updating role:", err);
        res.status(500).json({ message: "Internal server error" });
    }
});


routerUser.get("/", authenticateFirebaseUser, async (req,res)=>{
    const {email} = req.user;
    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }
    try{
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({message: "User not found"});
        }
        return res.status(200).json({message: "User received successfully", user});
    }catch (err) {
        console.error("Error getting team", err);
        return res.status(500).json({message: "Server error"});
    }
});



export default routerUser;