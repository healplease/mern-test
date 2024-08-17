import { Todo } from "./models.js";

export const todoMiddleware = async (req, res, next) => {
  const todo = await Todo.findOne({ _id: req.params.todoId, userId: req.user.id }).populate("user").populate("tasks").exec();
  if (!todo) {
    return res.status(404).end();
  }

  req.todo = todo;
  return next();
};