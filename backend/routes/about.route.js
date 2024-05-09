import express from "express";
import { getAboutByProvince } from "../controllers/about.controller.js";

const router = express.Router();

router.get("/:number", getAboutByProvince);

export default router;
