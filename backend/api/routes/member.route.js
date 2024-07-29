import express from "express";
import { postMember, updateMember } from "../controllers/member.controller.js";

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

export default router;
