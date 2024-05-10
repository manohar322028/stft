import { errorHandler } from "../utils/error.js";
import Download from "../models/download.model.js";

export const getAllDownloads = async (req, res, next) => {
  try {
    const notices = await Download.find();
    res.status(200).json(notices);
  } catch (err) {
    return next(errorHandler(500, "Error getting downloads"));
  }
};
