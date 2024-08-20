import { Todo } from "./models.js";

export const list = async (req, res, next) => {
  try {
    const todos = await Todo.find({ userId: req.user.id }).populate("user").populate("tasks").exec();
    return res.json({ todos: todos.map(todo => todo.toJSON()) });
  } catch (err) {
    next(err);
  }
};

export const create = async (req, res, next) => {
  try {
    const todo = new Todo({
      ...req.body,
      userId: req.user.id,
    });
    await todo.save();
    await todo.populate(["user", "tasks"]);

    return res.status(201).json({ ...todo.toJSON() });
  } catch (err) {
    next(err);
  }
}

export const get = async (req, res, next) => {
  try {
    return res.json({ ...req.todo.toJSON() });
  } catch (err) {
    next(err);
  }
};

export const update = async (req, res, next) => {
  try {
    Object.assign(req.todo, req.body);
    await req.todo.save();
    return res.json({ ...req.todo.toJSON() });
  } catch (err) {
    next(err);
  }
};

export const remove = async (req, res, next) => {
  try {
    await Todo.findByIdAndDelete(req.todo.id).exec();
    return res.json({ ...req.todo.toJSON() });
  } catch (err) {
    next(err);
  }
};