export const authorize = (policy) => (req, res, next) => {
  const user = req.user;
  const resource = req.project; 

  if (policy(user, resource)) {
    return next();
  }
  return res.status(403).json({ status: 403, message: "Access denied" });
};
