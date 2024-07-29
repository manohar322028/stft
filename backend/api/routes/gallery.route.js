import express from "express";
import {
  getAllPhotos,
  getAllFeatured,
} from "../controllers/gallery.controller.js";

const router = express.Router();

router.get("/", getAllPhotos);
router.get("/featured", getAllFeatured);

export default router;
