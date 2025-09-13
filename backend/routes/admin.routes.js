import {Router} from 'express';
import { adminLogin, createStudent, getAllStudentProfile, getApplicantsForJob, getStudentAndProfile } from '../controllers/admin.controller.js';

const router = Router();

// router.route('/register').post(register);
router.route('/adminlogin').post(adminLogin);
router.route('/createstudent').post(createStudent);
router.route('/admin/get_all_students').get(getAllStudentProfile);
router.route('/get_student_and_profile').get(getStudentAndProfile);
router.route('/get_applicants_for_job').post(getApplicantsForJob);

export default router;

//up to date till this