import express from "express";
import { applyForJob } from "../controllers/application.controller.js";

const router = express.Router();


router.route('/apply').post(applyForJob);

export default router;
