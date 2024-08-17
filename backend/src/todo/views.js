import { Todo } from "./models.js";

export const list = async (req, res, _next) => {
  const todos = await Todo.find({ userId: req.user.id }).populate("user").populate("tasks").exec();
  return res.json({ todos: todos.map(todo => todo.toJSON()) });
};

export const create = async (req, res, _next) => {
  const todo = new Todo({
    ...req.body,
    userId: req.user.id,
  });
  await todo.save();
  await todo.populate(["user", "tasks"]);

  return res.status(201).json({ ...todo.toJSON() });
}

export const get = async (req, res, _next) => {
  return res.json({ ...req.todo.toJSON() });
};

export const update = async (req, res, _next) => {
  Object.assign(req.todo, req.body);
  await req.todo.save();
  return res.json({ ...req.todo.toJSON() });
};

export const remove = async (req, res, _next) => {
  await Todo.findByIdAndDelete(req.todo.id).exec();
  return res.json({ ...req.todo.toJSON() });
};