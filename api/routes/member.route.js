import express from "express";
import { postMember } from "../controllers/member.controller.js";
import multer from "multer";
import path from "path";

const router = express.Router();

// Configure multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Specify the folder to save the files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Use a unique filename
  },
});

const upload = multer({ storage });

router.post(
  "/",
  upload.fields([
    { name: "voucher", maxCount: 1 },
    { name: "membership_certificate", maxCount: 1 },
  ]),
  postMember
);

export default router;
