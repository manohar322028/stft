import express from "express";
import { getAllDownloads } from "../controllers/download.controller.js";

const router = express.Router();

router.get("/", getAllDownloads);

export default router;
