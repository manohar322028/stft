import { errorHandler } from "../utils/error.js";
import Download from "../models/download.model.js";

export const getDownloadsByCategory = async (req, res, next) => {
  try {
    const { category } = req.params;
    const notices = await Download.find({ category: category });
    res.status(200).json(notices);
  } catch (err) {
    return next(errorHandler(500, "Error getting downloads"));
  }
};

export const getAllDownloads = async (req, res, next) => {
  try {
    const downloads = await Download.find();
    res.status(200).json(downloads);
  } catch (err) {
    return next(errorHandler(500, "Error getting downloads"));
  }
};
