import passport from "../passport-setup.js";
import User from "../models/userModel.js";

const login = passport.authenticate("google", {
  scope: ["email", "profile"],
});

const callback = [
  passport.authenticate("google", {
    failureRedirect: "/auth/failure",
    successRedirect: "http://localhost:5173",
    session: true,
  }),
];

const logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      console.log(err);
      return next(err);
    }
  });
  res.redirect("http://localhost:5173")
};

const failure = (req, res) => {
  return res.send("Failed to log in!");
};

const getProfile = (req, res) => {
  console.log(req.user);
  if (req.user) {
    User.findOne({ googleId: req.user.googleId })
      .then((user) => {
        if (user) {
          res.json({ user: user });
        } else {
          res.json({ user: null });
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
      });
  } else {
    res.json({ user: null });
  }
};

const addToPageBalance = async (req, res) => {
  try {
    console.log(req.body);
    const { id, quantity } = req.body;
    const user = await User.findOne({ _id: id });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    console.log(user.pageBalance);
    if (user.pageBalance + quantity < 0) {
      return res.status(400).json({ message: 'Not enough page balance!' });
    }

    user.pageBalance += quantity;

    const updatedUser = await user.save();
    return res.json(updatedUser);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

const setRole = (req, res) => {
  req.session.role = req.query.role;
  res.redirect('/auth/google');
};

export { login, callback, logout, failure, getProfile, setRole, addToPageBalance };
