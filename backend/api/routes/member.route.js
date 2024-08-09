import express from "express";
import {
  postMember,
  updateMember,
  sendEmail,
} from "../controllers/member.controller.js";

import { upload } from "../utils/uploader.js";

const router = express.Router();

router.post(
  "/",
  upload.fields([
    { name: "voucher", maxCount: 1 },
    { name: "membership_certificate", maxCount: 1 },
  ]),
  postMember
);
router.put(
  "/:id",
  upload.fields([{ name: "membership_certificate", maxCount: 1 }]),
  updateMember
);

router.post("/send-email", sendEmail);

export default router;
