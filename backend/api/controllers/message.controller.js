import Message from "../models/message.model.js";
import { errorHandler } from "../utils/error.js";

export const postMessage = async (req, res, next) => {
  try {
    const newMessage = new Message(req.body);
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    next(errorHandler(400, error.message));
  }
};
