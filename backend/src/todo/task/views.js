import { Task } from "./models.js";

export const list = async (req, res, _next) => {
  const tasks = await Task.find({ todoId: req.todo.id }).populate("todo").exec();
  return res.json({ tasks: tasks.map(task => task.toJSON()) });
};

export const create = async (req, res, _next) => {
  const task = new Task({
    ...req.body,
    todoId: req.todo.id,
  });
  await task.save();

  await task.populate("todo");
  return res.json({ ...task.toJSON() });
};

export const get = async (req, res, _next) => {
  return res.json({ ...req.task.toJSON() });
};

export const update = async (req, res, _next) => {
  Object.assign(req.task, req.body);
  await req.task.save();

  return res.json({ ...req.task.toJSON() });
};

export const remove = async (req, res, _next) => {
  await Task.findByIdAndDelete(req.task.id).exec();
  return res.json({ ...req.task.toJSON() });
};