import { Router } from "express";
import { activeCheck, createPost, deletePost, getAllPosts, getPost } from "../controllers/posts.controller.js";


const router = Router();

router.route('/').get(activeCheck);

router.route('/createpost').post(createPost);
router.route('/allposts').get(getAllPosts);
router.route('/deletepost').delete(deletePost);
router.route('/get_post').get(getPost);

export default router;

//up to date till this