import { errorHandler } from "../utils/error.js";
import Team from "../models/team.model.js";

export const getTeamByProvince = async (req, res, next) => {
  const { number } = req.params;
  try {
    const team = await Team.find({ province_number: number });

    if (!team) {
      return next(errorHandler(404, "team not found"));
    }
    res.status(200).json(team);
  } catch (err) {
    return next(errorHandler(500, "Error getting team"));
  }
};
