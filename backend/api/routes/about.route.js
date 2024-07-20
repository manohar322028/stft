import express from "express";
import {
  getAboutByProvince,
  getAllProvinceNames,
} from "../controllers/about.controller.js";

const router = express.Router();

router.get("/names", getAllProvinceNames);
router.get("/:number", getAboutByProvince);

export default router;
