import dotenv from "dotenv";
dotenv.config();

import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as LinkedInStrategy } from "passport-linkedin-oauth2";
import User from "../models/User.js";

console.log("Google Client ID:", process.env.GOOGLE_CLIENT_ID);
console.log("LinkedIn Client ID:", process.env.LINKEDIN_CLIENT_ID);

// Serialize user into the session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from the session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

/**
 * ✅ Google Strategy
 */
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          user = await User.create({
            name: profile.displayName,
            email: profile.emails[0].value,
            googleId: profile.id,
          });
        }

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

/**
 * ✅ LinkedIn Strategy
 */
passport.use(
  new LinkedInStrategy(
    {
      clientID: process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
      callbackURL: "/api/auth/linkedin/callback",
      scope: ["r_emailaddress", "r_liteprofile"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ linkedinId: profile.id });

        if (!user) {
          user = await User.create({
            name: profile.displayName,
            email: profile.emails[0].value,
            linkedinId: profile.id,
          });
        }

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

export default passport;
