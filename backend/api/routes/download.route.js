import express from "express";
import {
  getDownloadsByCategory,
  getAllDownloads,
} from "../controllers/download.controller.js";

const router = express.Router();

router.get("/:category", getDownloadsByCategory);
router.get("/", getAllDownloads);

export default router;
