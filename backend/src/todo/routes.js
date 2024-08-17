import { Router } from "express";

import taskRouter from "./task/routes.js";
import { list, create, get, update, remove } from "./views.js";
import { authMiddleware } from "../auth/middleware.js";

const todoRouter = Router({ mergeParams: true });

todoRouter.get("/", authMiddleware, list);
todoRouter.post("/", authMiddleware, create);
todoRouter.get("/:id", authMiddleware, get);
todoRouter.patch("/:id", authMiddleware, update);
todoRouter.delete("/:id", authMiddleware, remove);

todoRouter.use("/:todoId/tasks", taskRouter);

export default todoRouter;