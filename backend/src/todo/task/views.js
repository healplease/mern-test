import { Task } from "./models.js";
import { Todo } from "../models.js";

export const list = async (req, res, _next) => {
  const todo = await Todo.findOne({ _id: req.params.todoId }).exec();
  const tasks = await Task.find({ todoId: todo.id }).populate("todo").exec();
  return res.json({ tasks: tasks.map(task => task.toJSON()) });
};

export const create = async (req, res, _next) => {
  const todo = await Todo.findById(req.params.todoId).exec();

  const task = new Task({
    ...req.body,
    todoId: todo.id,
  });
  await task.save();

  await task.populate("todo");
  return res.json({ ...task.toJSON() });
};

export const get = async (req, res, _next) => {
  const todo = await Todo.findOne({ _id: req.params.todoId }).exec();
  const task = await Task.findOne({ _id: req.params.id, todo }).populate("todo").exec();

  if (!task) {
    return res.status(404).end();
  };

  return res.json({ ...task.toJSON() });
};

export const update = async (req, res, _next) => {
  const todo = await Todo.findOne({ _id: req.params.todoId }).exec();
  const task = await Task.findOne({ _id: req.params.id, todo }).populate("todo").exec();

  if (!task) {
    return res.status(404).end();
  };

  Object.assign(task, req.body);
  await task.save();

  return res.json({ ...task.toJSON() });
};

export const remove = async (req, res, _next) => {
  const todo = await Todo.findOne({ _id: req.params.todoId }).exec();
  const task = await Task.findOne({ _id: req.params.id, todo }).populate("todo").exec();

  if (!task) {
    return res.status(404).end();
  };

  await Task.findByIdAndDelete(task.id).exec();
  return res.status(200).json({ ...task.toJSON() });
};