import { errorHandler } from "../utils/error.js";
import News from "../models/news.model.js";

export const getAllNews = async (req, res, next) => {
  try {
    const news = await News.find();
    res.status(200).json(news);
  } catch (err) {
    return next(errorHandler(500, "Error getting news"));
  }
};

export const getNewsBySlug = async (req, res, next) => {
  const { slug } = req.params;
  try {
    const news = await News.findOne({ slug });
    if (!news) {
      return next(errorHandler(404, "News not found"));
    }
    res.status(200).json(news);
  } catch (err) {
    return next(errorHandler(500, "Error getting news"));
  }
};
