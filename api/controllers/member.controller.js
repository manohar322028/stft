import { errorHandler } from "../utils/error.js";
import Member from "../models/member.model.js";
import path from "path";
import fs from "fs";

const checkAndSaveFile = (file, folder, originalFilename) => {
  return new Promise((resolve, reject) => {
    const extension = path.extname(originalFilename);
    const baseName = path.basename(originalFilename, extension);
    let filename = `${baseName}${extension}`;
    let index = 1;
    const targetFolder = path.join("members", "uploads", folder);

    const checkFilename = (filename) => {
      const filepath = path.join(targetFolder, filename);
      fs.access(filepath, fs.constants.F_OK, (err) => {
        if (err) {
          // File does not exist, proceed to save
          fs.writeFile(filepath, file.buffer, (err) => {
            if (err) {
              return reject(err);
            }
            resolve(filepath);
          });
        } else {
          // File exists, increment index and check again
          filename = `${baseName}-${index}${extension}`;
          index++;
          checkFilename(filename);
        }
      });
    };

    // Ensure the folder exists
    fs.mkdir(targetFolder, { recursive: true }, (err) => {
      if (err) {
        return reject(err);
      }
      checkFilename(filename);
    });
  });
};

export const postMember = async (req, res, next) => {
  try {
    // Check if the email already exists
    const existingMember = await Member.findOne({ email: req.body.email });
    if (existingMember) {
      return next(
        errorHandler(400, "Member with this email is already registered.")
      );
    }

    if (
      req.body.membership_number != null &&
      req.body.membership_number != ""
    ) {
      const existingMemberNumber = await Member.findOne({
        membership_number: req.body.membership_number,
      });
      if (existingMemberNumber) {
        return next(
          errorHandler(
            400,
            "Member with this membership number is already registered."
          )
        );
      }
    }

    // Filter out fields containing null and blank values
    const filteredData = Object.entries(req.body).reduce(
      (acc, [key, value]) => {
        if (value !== null && value !== "") {
          acc[key] = value;
        }
        return acc;
      },
      {}
    );

    // Create the member with the filtered data
    const member = new Member(filteredData);
    await member.save();

    // Save the uploaded files to the appropriate directories
    if (req.files.voucher) {
      const voucherFilename = `${member._id}${path.extname(
        req.files.voucher[0].originalname
      )}`;
      const voucherPath = await checkAndSaveFile(
        req.files.voucher[0],
        "vouchers",
        voucherFilename
      );
      member.voucher = `vouchers/${voucherFilename}`;
    }
    if (req.files.membership_certificate) {
      const certificateFilename = `${member._id}${path.extname(
        req.files.membership_certificate[0].originalname
      )}`;
      const certificatePath = await checkAndSaveFile(
        req.files.membership_certificate[0],
        "certificates",
        certificateFilename
      );
      member.membership_certificate = `certificates/${certificateFilename}`;
    }

    // Save the member document with the file paths
    const savedMember = await member.save();

    res.status(201).json(savedMember);
  } catch (err) {
    console.log(err);
    return next(errorHandler(500, "Error creating member"));
  }
};
