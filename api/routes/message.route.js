import express from "express";
import { postMessage } from "../controllers/message.controller.js";

const router = express.Router();

router.post("/", postMessage);

export default router;
