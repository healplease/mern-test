import mongoose from "mongoose";

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

TodoSchema.methods.toJSON = function () {
  return {
    id: this._id,
    user: this.user,
    title: this.title,
    description: this.description,
    tasks: this.tasks,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };
};

export const Todo = mongoose.model("Todo", TodoSchema);