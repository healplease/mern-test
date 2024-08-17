import { User } from "./models.js";

export const login = async (req, res, _next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).exec();

  if (!user) {
    return res.status(401).json({ errors: { email: "not found" } });
  }

  if (!user.verifyPassword(password)) {
    return res.status(401).json({ errors: { password: "is invalid" } });
  }

  return res.json({ token: user.generateJWT(), user: user.toJSON() });
};

export const register = async (req, res, _next) => {
  const user = new User({ ...req.body });
  await user.save();

  return res.json({ token: user.generateJWT(), user: user.toJSON() });
};

export const me = async (req, res, _next) => {
  return res.json({ user: req.user.toJSON() });
};