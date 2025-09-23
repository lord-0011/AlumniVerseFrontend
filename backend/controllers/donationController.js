import Donation from "../models/Donation.js";

// Named export
export const addDonation = async (req, res) => {
  try {
    const donation = await Donation.create({
      user: req.user.id,
      amount: req.body.amount,
    });
    res.status(201).json(donation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getDonations = async (req, res) => {
  try {
    const donations = await Donation.find({ user: req.user.id });
    res.json(donations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
