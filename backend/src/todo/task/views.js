import { Task } from "./models.js";

export const list = async (req, res, next) => {
  try {
    const tasks = await Task.find({ todoId: req.todo.id }).populate("todo").exec();
    return res.json({ tasks: tasks.map(task => task.toJSON()) });
  } catch (err) {
    next(err);
  }
};

export const create = async (req, res, next) => {
  try {
    const task = new Task({
      ...req.body,
      todoId: req.todo.id,
    });
    await task.save();

    await task.populate("todo");
    return res.json({ ...task.toJSON() });
  } catch (err) {
    next(err);
  }
};

export const get = async (req, res, next) => {
  try {
    return res.json({ ...req.task.toJSON() });
  }
  catch (err) {
    next(err);
  }
};

export const update = async (req, res, next) => {
  try {
    Object.assign(req.task, req.body);
    await req.task.save();

    return res.json({ ...req.task.toJSON() });
  } catch (err) {
    next(err);
  }
};

export const remove = async (req, res, next) => {
  try {
    await Task.findByIdAndDelete(req.task.id).exec();
    return res.json({ ...req.task.toJSON() });
  } catch (err) {
    next(err);
  }
};