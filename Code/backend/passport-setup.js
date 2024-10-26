import passport from "passport";
import { Strategy } from "passport-google-oauth20";
import config from "./config.js";
import User from "./models/userModel.js"; 

const AUTH_OPTIONS = {
  callbackURL: "/auth/google/callback",
  clientID: config.CLIENT_ID,
  clientSecret: config.CLIENT_SECRET,
  passReqToCallback: true,
};

function verifyCallback(req, accessToken, refreshToken, profile, done) {
  User.findOne({ googleId: profile.id }).then((existingUser) => {
    if (existingUser) {
      done(null, existingUser);
      console.log("User already exists");
    } else {
      new User({
        googleId: profile.id,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        avatar: profile.photos[0].value,
        email: profile.emails[0].value,
        role: req.session.role,
      })
        .save()
        .then((user) => done(null, user));
    }
  });
}

passport.use(new Strategy(AUTH_OPTIONS, verifyCallback));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

export default passport;
