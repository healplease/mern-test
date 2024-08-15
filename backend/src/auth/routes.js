import { Router } from "express";

import { login, register, me } from "./views.js";

const authRouter = Router();

authRouter.post("/login", login);
authRouter.post("/register", register);
authRouter.get("/me", me);

export default authRouter;