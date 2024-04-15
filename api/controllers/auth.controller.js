import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const login = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return next(errorHandler(404, "User not found"));
    }
    const isMatch = await bcryptjs.compareSync(password, user.password);
    if (!isMatch) {
      return next(errorHandler(401, "Invalid password"));
    }
    const token = jwt.sign(
      { username: user.username, type: user.type },
      process.env.JWT_SECRET
    );
    const { password: _, ...userWithoutPassword } = user.toObject();
    res
      .status(200)
      .cookie("token", token, { httpOnly: true })
      .json(userWithoutPassword);
  } catch (err) {
    return next(err);
  }
};
