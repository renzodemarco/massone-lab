import UserModel from "../models/users.model.js";
import CustomError from "../utils/custom.error.js";
import dictionary from "../utils/error.dictionary.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import env from '../config/env.config.js'

export async function loginUser({ username, password }) {

  const user = await UserModel.findOne({ username });
  if (!user) CustomError.new(dictionary.userNotFound);

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) CustomError.new(dictionary.invalidCredentials);

  const token = jwt.sign(
    { userId: user._id, username: user.username },
    env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  return { token, user: user.username };
}