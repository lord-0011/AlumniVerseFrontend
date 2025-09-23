import express from "express";
import passport from "passport";
import { registerUser, loginUser } from "../controllers/authController.js";

const router = express.Router();

// 📌 Local signup & login
router.post("/signup", registerUser);
router.post("/login", loginUser);

// 📌 Google OAuth
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:5173/login",
    successRedirect: "http://localhost:5173/", // redirect on success
  })
);

// 📌 LinkedIn OAuth
router.get("/linkedin", passport.authenticate("linkedin", { state: "SOME STATE" }));

router.get(
  "/linkedin/callback",
  passport.authenticate("linkedin", {
    failureRedirect: "http://localhost:5173/login",
    successRedirect: "http://localhost:5173/", // redirect on success
  })
);

// 📌 Logout route (works for both local & OAuth)
router.get("/logout", (req, res, next) => {
  req.logout(err => {
    if (err) return next(err);
    res.redirect("http://localhost:5173/");
  });
});

export default router;