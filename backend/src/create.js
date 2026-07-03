import mongoose from "mongoose";
import bcrypt from "bcrypt";
import UserModel from "./models/users.model.js";
import env from "./config/env.config.js";

await mongoose.connect(env.MONGO_URI);

const hashedPassword = await bcrypt.hash(
  "12345678",
  10
);

await UserModel.create({
  username: "admin",
  password: hashedPassword
});

console.log("User created");

process.exit(0);