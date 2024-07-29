import { errorHandler } from "../utils/error.js";
import Gallery from "../models/gallery.model.js";

export const getAllPhotos = async (req, res, next) => {
  try {
    const photos = await Gallery.find();
    res.status(200).json(photos);
  } catch (err) {
    return next(errorHandler(500, "Error getting photos"));
  }
};

export const getAllFeatured = async (req, res, next) => {
  try {
    const photos = await Gallery.find({ isFeatured: true });
    res.status(200).json(photos);
  } catch (err) {
    return next(errorHandler(500, "Error getting featured photos"));
  }
};
