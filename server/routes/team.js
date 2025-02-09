import express from "express";
import { Team } from "../models/teammodel.js";
import { User } from "../models/usermodel.js";
import authenticateAPIUser from "../middleware/JWTauth.js";

const routerTeam = express.Router();

/**
 * @route GET /team
 * @desc Retrieve the current user's team details
 */
routerTeam.get("/", authenticateAPIUser(), async (req, res) => {
  const teamName = req.user.teamName;
  if (!teamName) {
    return res.status(400).json({ message: "User is not part of any team" });
  }
  try {
    const team = await Team.findOne({ teamName }).populate({
      path: "members",
      select: "email name regNo role",
    });
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }
    const teamData = {
      teamName: team.teamName,
      idea: team.idea,
      members: team.members.map(({ email, name, regNo, role }) => ({
        email,
        name,
        regNo,
        role,
      })),
    };
    return res
      .status(200)
      .json({ message: "Team data received successfully", teamData });
  } catch (err) {
    console.error("Error getting team", err);
    return res.status(500).json({ message: "Server error" });
  }
});

/**
 * @route POST /team/create
 * @desc Create a new team
 */
routerTeam.post(
  "/create",
  authenticateAPIUser(["leader"]),
  async (req, res) => {
    const { teamName } = req.body;
    const userId = req.user._id;
    if (!teamName || teamName.trim() === "") {
      return res.status(403).json({ message: "Team name cannot be empty" });
    }
    try {
      const user = await User.findOne({ _id: userId });
      if (user.teamName) {
        return res
          .status(400)
          .json({ message: "You are already part of a team" });
      }
      const existingTeam = await Team.findOne({ teamName });
      if (existingTeam) {
        return res.status(400).json({ message: "Team name already exists" });
      }
      const newTeam = new Team({
        teamName,
        leaderId: userId,
        members: [userId],
      });
      const savedTeam = await newTeam.save();
      user.teamName = savedTeam.teamName;
      user.role = "leader";
      await user.save();
      return res
        .status(201)
        .json({ message: "Team created successfully", team: savedTeam });
    } catch (err) {
      console.error("Error creating team: ", err);
      res.status(500).json({ message: "Server error" });
    }
  }
);

/**
 * @route POST /team/join
 * @desc Join an existing team by team name
 */
routerTeam.post("/join", authenticateAPIUser(["leader"]), async (req, res) => {
  const { teamName } = req.body;
  const userId = req.user._id;
  if (!teamName || teamName.trim() === "") {
    return res.status(403).json({ message: "Team name cannot be empty" });
  }
  try {
    const user = await User.findOne({ _id: userId });
    if (user.teamName) {
      return res
        .status(400)
        .json({ message: "You are already part of a team" });
    }
    const team = await Team.findOne({ teamName });
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }
    if (team.members.length >= 5 /* For now*/) {
      return res
        .status(400)
        .json({ message: "Team is full. Maximum 5 members allowed" });
    }
    team.members.push(userId);
    await team.save();
    user.teamName = team.teamName;
    user.role = "member";
    await user.save();
    return res
      .status(200)
      .json({ message: "Successfully joined the team", team });
  } catch (err) {
    console.error("Error joining team: ", err);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * @route PATCH /team/leave
 * @desc Leave the current team (leader or member)
 */
routerTeam.patch(
  "/leave",
  authenticateAPIUser(["member", "leader"]),
  async (req, res) => {
    const userId = req.user._id;
    try {
      const user = await User.findOne({ _id: userId });
      if (!user.teamName) {
        return res
          .status(404)
          .json({ message: "You are not part of any team" });
      }
      const team = await Team.findOne({ teamName: user.teamName });
      if (!team) {
        return res.status(404).json({ message: "Team not found" });
      }
      if (team.leaderId.toString() === userId) {
        if (team.members.length === 1) {
          await Team.findByIdAndDelete(team._id);
          user.teamName = null;
          user.role = "leader";
          await user.save();
          return res.status(200).json({
            message: "Team dissolved successfully as you were the only member",
          });
        } else {
          const newLeaderId = team.members.find(
            (memberId) => memberId.toString() !== userId
          );
          team.leaderId = newLeaderId;
          team.members = team.members.filter(
            (memberId) => memberId.toString() !== userId
          );
          await team.save();
          user.teamName = null;
          await user.save();
          await User.findByIdAndUpdate(newLeaderId, { role: "leader" });
          return res.status(200).json({
            message:
              "Left the team successfully. Leadership has been transferred to another member",
            team,
          });
        }
      } else {
        team.members = team.members.filter(
          (memberId) => memberId.toString() !== userId
        );
        await team.save();
        user.teamName = null;
        user.role = "leader";
        await user.save();
        return res
          .status(200)
          .json({ message: "Left the team successfully", team });
      }
    } catch (err) {
      console.error("Error leaving team: ", err);
      return res.status(500).json({ message: "Server error" });
    }
  }
);

/**
 * @route POST /team/idea
 * @desc Submit an idea for the team (only by team leader)
 */
routerTeam.post("/idea", authenticateAPIUser(["leader"]), async (req, res) => {
  const { idea } = req.body;
  const userId = req.user._id;
  if (!idea || idea.trim() === "") {
    return res.status(400).json({ message: "Idea cannot be empty" });
  }
  try {
    const user = await User.findOne({ _id: userId });
    if (!user.teamName) {
      return res.status(404).json({ message: "You are not part of any team" });
    }
    const team = await Team.findOne({ teamName: user.teamName });
    if (team.leaderId.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "Only team leader can submit the idea" });
    }
    if (!team.isEditable) {
      return res.status(403).json({ message: "Idea is no longer editable" });
    }
    Object.assign(team, {
      idea,
    });
    await team.save();
    return res
      .status(200)
      .json({ message: "Idea submitted successfully", team });
  } catch (err) {
    console.error("Error submitting idea: ", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default routerTeam;
