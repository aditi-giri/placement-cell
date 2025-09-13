import {Router} from 'express';
import {  getMyApplications, getMyProfile, login, updateProfileData, uploadProfilePicture } from '../controllers/student.controller.js';
import multer from 'multer';

const router = Router();

//storage to store the updated profile pic
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req,file, cb) => {
        cb(null, file.originalname)
    }
})

const upload = multer({storage: storage})

router.route("/update_profile_picture")
    .post(upload.single('profile_picture'), uploadProfilePicture)

// router.route('/register').post(register);
router.route('/login').post(login);

//not to be changed by student
// router.route('/student_update').post(updateStudentProfile);

router.route('/get_my_profile').get(getMyProfile);



router.route('/update_profile_data').post(updateProfileData);
router.route('/get_my_applications').get(getMyApplications);


// router.route('/student/download_resume').get(downloadProfile);



export default router;