import {Router} from 'express';
import {  getAllFeedbacks,  getFeedbackById,  submitFeedback, } from '../controllers/feedback.controller.js';

const router = Router();

router.route('/submit_feedback').post(submitFeedback);
router.route('/admin/get_feedbacks').get(getAllFeedbacks);
router.route('/admin/get_feedback/:feedback_id').get(getFeedbackById);



export default router;