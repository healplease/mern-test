import mongoose from "mongoose";

export const TaskSchema = new mongoose.Schema({
  todoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Todo",
  },
  title: {
    type: String,
    required: [true, "can't be blank"],
  },
  description: {
    type: String,
  },
  completed: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

TaskSchema.virtual("todo", {
  ref: "Todo",
  localField: "todoId",
  foreignField: "_id",
});

TaskSchema.methods.toJSON = function() {
  return {
    id: this._id,
    todo: this.todo,
    title: this.title,
    description: this.description,
    completed: this.completed,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };
};

export const Task = mongoose.model("Task", TaskSchema);