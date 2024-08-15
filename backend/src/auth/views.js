import { User } from "./models.js";
import jwt from "jsonwebtoken";

export const login = async (req, res, _next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ errors: { email: "not found" } });
    }

    if (!user.verifyPassword(password)) {
      return res.status(401).json({ errors: { password: "is invalid" } });
    }

    return res.json({ token: user.generateJWT(), user: user.toJSON() });
  }
  catch (e) {
    console.error(e);
    return res.status(500).end();
  }
};

export const register = async (req, res, _next) => {
  const { username, email, password } = req.body;

  try {
    const user = new User({ username, email, password });
    await user.save();

    return res.json({ token: user.generateJWT(), user: user.toJSON() });
  }
  catch (e) {
    console.error(e);
    return res.status(500).end();
  }
};

export const me = async (req, res, _next) => {
  if (!req.headers.authorization) {
    return res.status(401).end();
  }

  const token = req.headers.authorization.split(" ")[1];

  try {
    const { id } = jwt.verify(token, process.env.AUTH_SECRET);
    const user = await User.findOne({ _id: id });

    if (!user) {
      return res.status(401).end();
    }

    return res.json({ user: user.toJSON() });
  }
  catch (e) {
    console.error(e);
    return res.status(401).end();
  }
};