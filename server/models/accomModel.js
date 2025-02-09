import mongoose from "mongoose";

const accomodation = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  requireAccomodation: {
    type: Boolean,
    required: true,
  },
});

export const Accomodation = mongoose.model("Accomodation", accomodation);
