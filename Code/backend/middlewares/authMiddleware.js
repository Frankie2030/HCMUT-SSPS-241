export function checkLoggedIn(req, res, next) {
  const isLoggedIn = req.isAuthenticated() && req.user;
  if (!isLoggedIn) {
    return res.status(401).json({
      error: "You must log in!",
    });
  }
  next();
}

export function checkSPSORole(req, res, next) {
  if (req.user && req.user.role === "SPSO") {
    return next();
  }
  return res
    .status(403)
    .json({ error: "Access forbidden: Insufficient permissions" });
}
