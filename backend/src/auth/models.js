import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import crypto from "crypto";
import jwt from "jsonwebtoken";

export const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "can't be blank"],
    unique: [true, "is already taken"],
    match: [/^[a-zA-Z0-9]+$/, "is invalid"],
    index: true,
  },
  email: {
    type: String,
    required: [true, "can't be blank"],
    unique: [true, "is already taken"],
    match: [/\S+@\S+\.\S+/, "is invalid"],
    index: true,
  },
  passwordHash: {
    type: String,
    required: [true, "can't be blank"],
  },
  avatar: {
    type: String,
  },
}, { timestamps: true });

UserSchema.plugin(uniqueValidator, { message: "is already taken." });

UserSchema.virtual("password").set(function (password) {
  this.passwordHash = crypto.createHmac("sha256", process.env.AUTH_SECRET).update(password).digest("hex");
});

UserSchema.methods.verifyPassword = function (password) {
  return this.passwordHash === crypto.createHmac("sha256",
    process.env.AUTH_SECRET).update(password).digest("hex");
};

UserSchema.methods.generateJWT = function () {
  return jwt.sign({
    id: this._id,
  },
  process.env.AUTH_SECRET,
  {
    algorithm: "HS256",
    expiresIn: "1d",
  });
};

UserSchema.methods.toJSON = function () {
  return {
    username: this.username,
    email: this.email,
    avatar: this.avatar,
  };
}

export const User = mongoose.model("User", UserSchema);