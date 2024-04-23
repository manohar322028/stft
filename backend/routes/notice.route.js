import express from "express";
import { getAllNotices } from "../controllers/notice.controller.js";

const router = express.Router();

router.get("/", getAllNotices);

export default router;
