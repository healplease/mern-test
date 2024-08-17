import { Router } from "express";

import { list, create, get, update, remove } from "./views.js";

const taskRouter = Router({ mergeParams: true });

taskRouter.get("/", list);
taskRouter.post("/", create);
taskRouter.get("/:id", get);
taskRouter.patch("/:id", update);
taskRouter.delete("/:id", remove);

export default taskRouter;