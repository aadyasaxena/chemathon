import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    UniversityName: {
        type: String,
        required: true,
        unique: true,
    },
    teamName: {
        type: String,
        ref: "Team",
        default: null,
    },
    accomodation: {
        type:Boolean,
        required: true,
    },
    registered: {
        type: String,
        enum: ["talkshow","talkshow and participant"],
    },
    role: {
        type: String,
        enum: ["member", "leader"],
        default: "leader",
    },
}, {
    timestamps: true,
},);

export const User = mongoose.model("User", userSchema);