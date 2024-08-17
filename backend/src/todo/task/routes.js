import { Router } from "express";

import { list, create, get, update, remove } from "./views.js";
import { authMiddleware } from "../../auth/middleware.js";
import { todoMiddleware } from "../middleware.js";
import { taskMiddleware } from "./middleware.js";

const taskRouter = Router({ mergeParams: true });

taskRouter.get("/", authMiddleware, todoMiddleware, list);
taskRouter.post("/", authMiddleware, todoMiddleware, create);
taskRouter.get("/:taskId", authMiddleware, todoMiddleware, taskMiddleware, get);
taskRouter.patch("/:taskId", authMiddleware, todoMiddleware, taskMiddleware, update);
taskRouter.delete("/:taskId", authMiddleware, todoMiddleware, taskMiddleware, remove);

export default taskRouter;