import { errorHandler } from "../utils/error.js";
import About from "../models/about.model.js";

export const getAboutByProvince = async (req, res, next) => {
  const { number } = req.params;
  try {
    const about = await About.findOne({ province_number: number });

    if (!about) {
      return next(errorHandler(404, "about not found"));
    }
    res.status(200).json(about);
  } catch (err) {
    return next(errorHandler(500, "Error getting about"));
  }
};
