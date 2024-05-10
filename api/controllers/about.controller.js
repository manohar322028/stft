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

export const getAllProvinceNames = async (req, res, next) => {
  try {
    const provinces = await About.find(
      { province_number: { $ne: 0 } },
      { province_number: 1, province_name: 1, _id: 0 }
    );

    res.status(200).json(provinces);
  } catch (err) {
    return next(errorHandler(500, "Error getting provinces"));
  }
};
