import express from "express";
import handler from "./controllers.js";
const router = express.Router();

router.post("/",handler)

export default router;

