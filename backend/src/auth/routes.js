import { Router } from "express";

import { login, register, me } from "./views.js";
import { authMiddleware } from "./middleware.js";

const authRouter = Router({ mergeParams: true });

authRouter.get("/me", authMiddleware, me);
authRouter.post("/login", login);
authRouter.post("/register", register);

export default authRouter;