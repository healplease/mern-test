import { Task } from "./models.js";

export const taskMiddleware = async (req, res, next) => {
  const task = await Task.findOne({ _id: req.params.taskId, todoId: req.todo.id }).populate("todo").exec();
  if (!task) {
    return res.status(404).end();
  }

  req.task = task;
  return next();
};
