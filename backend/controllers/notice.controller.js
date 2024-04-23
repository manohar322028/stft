import { errorHandler } from "../utils/error.js";
import Notice from "../models/notice.model.js";

export const getAllNotices = async (req, res, next) => {
  try {
    const notices = await Notice.find();
    res.status(200).json(notices);
  } catch (err) {
    return next(errorHandler(500, "Error getting notices"));
  }
};
