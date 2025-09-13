import { Router } from "express";
import { addEvent, getAllEvents, deleteEvent } from "../controllers/event.controller.js";

const router = Router();

router.route("/add").post(addEvent); // Admin only
router.route("/all").get(getAllEvents); // Open to all
router.route("/delete/:event_id").delete(deleteEvent); // Admin only

export default router;
