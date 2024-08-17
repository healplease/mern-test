import { Router } from "express";

import taskRouter from "./task/routes.js";
import { list, create, get, update, remove } from "./views.js";
import { authMiddleware } from "../auth/middleware.js";
import { todoMiddleware } from "./middleware.js";

const todoRouter = Router({ mergeParams: true });

todoRouter.get("/", authMiddleware, list);
todoRouter.post("/", authMiddleware, create);
todoRouter.get("/:todoId", authMiddleware, todoMiddleware, get);
todoRouter.patch("/:todoId", authMiddleware, todoMiddleware, update);
todoRouter.delete("/:todoId", authMiddleware, todoMiddleware, remove);

todoRouter.use("/:todoId/tasks", taskRouter);

export default todoRouter;