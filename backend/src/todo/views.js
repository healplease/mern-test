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
  const todo = await Todo.findOne({ _id: req.params.id, user: req.user.id }).populate("user").populate("tasks").exec();

  if (!todo) {
    return res.status(404).end();
  }

  return res.json({ ...todo.toJSON() });
};

export const update = async (req, res, _next) => {
  const todo = await Todo.findOne({ _id: req.params.id, user: req.user.id }).populate("user").populate("tasks").exec();

  if (!todo) {
    return res.status(404).end();
  }

  Object.assign(todo, req.body);
  await todo.save();
  return res.json({ ...todo.toJSON() });
};

export const remove = async (req, res, _next) => {
  const todo = await Todo.findOne({ _id: req.params.id, user: req.user.id }).populate("user").populate("tasks").exec();

  if (!todo) {
    return res.status(404).end();
  }

  await Todo.findByIdAndDelete(todo.id).exec();
  
  return res.status(200).json({ ...todo.toJSON() });
};