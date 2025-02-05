import mongoose from "mongoose";

const Payment = new mongoose.Schema({
  paid: {
    type: Boolean,
    required: false,
  },
});

export const paymentStatus = mongoose.model("paymentStatus", Payment);
