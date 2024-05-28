import express from "express";
import { postMember } from "../controllers/member.controller.js";

const router = express.Router();

router.post("/", postMember);

export default router;
