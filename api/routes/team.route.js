import express from "express";
import { getTeamByProvince } from "../controllers/team.controller.js";

const router = express.Router();

router.get("/:number", getTeamByProvince);

export default router;
