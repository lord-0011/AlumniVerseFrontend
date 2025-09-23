import mongoose from "mongoose";

const donationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

export default mongoose.model("Donation", donationSchema);
