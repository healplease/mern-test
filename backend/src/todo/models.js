import mongoose from "mongoose";

import { Task } from "./task/models.js";

export const TodoSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    required: [true, "can't be blank"],
  },
  description: {
    type: String,
  },
}, { timestamps: true });

TodoSchema.virtual("tasks", {
  ref: "Task",
  localField: "_id",
  foreignField: "todoId",
});

TodoSchema.virtual("user", {
  ref: "User",
  localField: "userId",
  foreignField: "_id",
  justOne: true,
});

TodoSchema.set("toObject", { virtuals: true });
TodoSchema.set("toJSON", { virtuals: true });

// TodoSchema.virtual("completed").get(function () {
//   return this.tasks.length > 0 ? this.tasks.every(task => task.completed) : false;
// });

// TodoSchema.virtual("percentCompleted").get(function () {
//   if (this.tasks.length === 0) {
//     return 0;
//   }

//   const completedTasks = this.tasks.filter(task => task.completed);
//   return Math.round((completedTasks.length / this.tasks.length) * 100);
// });

TodoSchema.methods.toJSON = function () {
  return {
    id: this._id,
    user: this.user,
    title: this.title,
    description: this.description,
    tasks: this.tasks,
    // completed: this.completed,
    // percentCompleted: this.percentCompleted,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };
};

export const Todo = mongoose.model("Todo", TodoSchema);