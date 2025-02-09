import express from "express";
import { Accomodation } from "../models/accomModel.js";

const accommodationRouter = express.Router();

accommodationRouter.get("/accommodations", async (req, res) => {
  try {
    const accommodations = await Accomodation.find();
    res.status(200).json(accommodations);
  } catch (error) {
    console.error("Error fetching accommodations:", error);
    res.status(500).json({ message: "Error fetching accommodations" });
  }
});

accommodationRouter.post("/book-accommodation", async (req, res) => {
  try {
    const { name, description, price, requireAccomodation } = req.body;
    const newAccommodation = new Accomodation({
      name,
      description,
      price,
      requireAccomodation,
    });
    await newAccommodation.save();
    res.status(201).json({ message: "Accommodation booked successfully" });
  } catch (error) {
    console.error("Error booking accommodation:", error);
    res.status(500).json({ message: "Error booking accommodation" });
  }
});

export default accommodationRouter;
