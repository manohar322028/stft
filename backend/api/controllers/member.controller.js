import { errorHandler } from "../utils/error.js";
import Member from "../models/member.model.js";
import path from "path";
import fs from "fs";
import send from "../utils/mailer.js";

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
      const voucherFilename = `${req.body.first_name}-${
        req.body.last_name
      }${path.extname(req.files.voucher[0].originalname)}`;
      const voucherPath = await checkAndSaveFile(
        req.files.voucher[0],
        "vouchers",
        voucherFilename
      );
      member.voucher = `vouchers/${voucherFilename}`;
    }
    if (req.files.membership_certificate) {
      const certificateFilename = `${req.body.first_name}-${
        req.body.last_name
      }${path.extname(req.files.membership_certificate[0].originalname)}`;
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

export const updateMember = async (req, res, next) => {
  try {
    const memberId = req.params.id;
    const member = await Member.findById(memberId);
    if (!member) {
      return next(errorHandler(404, "Member not found"));
    }

    // Check if the updated email already exists
    if (req.body.email && req.body.email !== member.email) {
      const existingMember = await Member.findOne({ email: req.body.email });
      if (existingMember) {
        return next(
          errorHandler(400, "Member with this email is already registered.")
        );
      }
    }

    // Check if the updated membership number already exists
    if (
      req.body.membership_number &&
      req.body.membership_number !== member.membership_number
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

    // Update the member with the filtered data
    Object.assign(member, filteredData);

    // Save the uploaded files to the appropriate directories

    if (req.files.membership_certificate) {
      const certificateFilename = `${member.first_name}-${
        member.last_name
      }${path.extname(req.files.membership_certificate[0].originalname)}`;
      const certificatePath = await checkAndSaveFile(
        req.files.membership_certificate[0],
        "certificates",
        certificateFilename
      );
      member.membership_certificate = `certificates/${certificateFilename}`;
    }

    // Save the updated member document with the file paths
    const savedMember = await member.save();

    res.status(200).json(savedMember);
  } catch (err) {
    console.log(err);
    return next(errorHandler(500, "Error updating member"));
  }
};

export const sendEmail = async (req, res) => {
  const { to, subject, html, attachmentPath } = req.body;

  try {
    await send({ to, subject, html, attachmentPath });
    res.status(200).send("Email sent successfully");
  } catch (error) {
    res.status(500).send("Error while sending email");
  }
};
