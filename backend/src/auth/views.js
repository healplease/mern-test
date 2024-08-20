import { User } from "./models.js";
import { ValidationError } from "../error.js";

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
  
    const user = await User.findOne({ email }).exec();
  
    if (!user || !user.verifyPassword) {
      throw new ValidationError({ errors: { email: "invalid login or password" } });
    }
  
    return res.json({ token: user.generateJWT(), user: user.toJSON() });
  } catch (err) {
    next(err);
  }
};

export const register = async (req, res, next) => {
  try {
    const user = new User({ ...req.body });
    await user.save();
  
    return res.json({ token: user.generateJWT(), user: user.toJSON() });
  } catch (err) {
    next(err);
  }
};

export const me = async (req, res, next) => {
  try {
    return res.json({ user: req.user.toJSON() });
  } catch (err) {
    next(err);
  }
};