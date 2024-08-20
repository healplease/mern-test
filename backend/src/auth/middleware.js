import { User } from "./models.js";
import jwt from "jsonwebtoken";

export const authMiddleware = async (req, _res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1] ?? "";

    const { id } = jwt.verify(token, process.env.AUTH_SECRET);
    req.user = await User.findById(id).exec();
    next();
  } catch (err) {
    next(err);
  }
};