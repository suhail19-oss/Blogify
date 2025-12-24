const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required."],
      minlength: [4, "Username must be at least 4 characters long."],
      unique: true,
      trim: true, 
    },
    password: {
      type: String,
      required: [true, "Password is required."],
      minlength: [8, "Password must be at least 8 characters long."],
    },
  },
  { timestamps: true } 
);

UserSchema.index({ username: 1 }, { unique: true });

const UserModel = model("User", UserSchema);
module.exports = UserModel;
