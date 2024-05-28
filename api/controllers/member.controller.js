import { errorHandler } from "../utils/error.js";
import Member from "../models/member.model.js";

export const postMember = async (req, res, next) => {
  try {
    const member = await Member.create(req.body);
    res.status(201).json(member);
  } catch (err) {
    console.log(err);
    return next(errorHandler(500, "Error creating member"));
  }
};
