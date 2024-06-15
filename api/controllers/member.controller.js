import { errorHandler } from "../utils/error.js";
import Member from "../models/member.model.js";

export const postMember = async (req, res, next) => {
  try {
    // Create the member with the form data
    const member = await Member.create(req.body);

    // Save the uploaded files to the member document
    if (req.files.voucher) {
      member.voucher = req.files.voucher[0].path;
    }
    if (req.files.membership_certificate) {
      member.membership_certificate = req.files.membership_certificate[0].path;
    }

    await member.save();

    res.status(201).json(member);
  } catch (err) {
    console.log(err);
    return next(errorHandler(500, "Error creating member"));
  }
};
