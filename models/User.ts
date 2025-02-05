import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  name: { type: String, required: true },
  profilePic: { type: String },
  address: { type: String },

  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true, unique: true },

  password: { type: String },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default model("User", UserSchema, "Users");
