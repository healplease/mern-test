import { User } from "./models.js";
import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).end();
  }

  const token = req.headers.authorization.split(" ")[1];

  try {
    const { id } = jwt.verify(token, process.env.AUTH_SECRET);
    req.user = await User.findById(id).exec();
    next();
  }
  catch (e) {
    console.error(e);
    return res.status(401).end();
  }
};