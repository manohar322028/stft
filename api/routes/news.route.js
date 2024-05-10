import express from "express";
import { getAllNews, getNewsBySlug } from "../controllers/news.controller.js";

const router = express.Router();

router.get("/", getAllNews);
router.get("/:slug", getNewsBySlug);

export default router;
