 import dotenv from "dotenv";

if(process.env.NODE_ENV !="production"){
    dotenv.config(); // load env variables

    // console.log(process.env);
}

console.log("Google Client ID:", process.env.GOOGLE_CLIENT_ID);
console.log("LinkedIn Client ID:", process.env.LINKEDIN_CLIENT_ID);

// backend/server.js
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import donationRoutes from "./routes/donationRoutes.js";
import session from "express-session";
import passport from "./config/passport.js";



// Log to check if env vars are working
console.log("Google Client ID:", process.env.GOOGLE_CLIENT_ID);
console.log("LinkedIn Client ID:", process.env.LINKEDIN_CLIENT_ID);

const app = express();

// Connect DB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET || "fallbackSecret", // safer than hardcoding
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/donations", donationRoutes);

// Error handler (optional but recommended)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
