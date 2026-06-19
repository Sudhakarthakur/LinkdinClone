import { Router } from "express";
import { activeCheack, comment, createPost, delete_comment_by_user, deletePost, get_comment_by_post, getAllPost, incrementLikes } from "../controllers/postController.js";
import multer from "multer";


const router = Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    }, filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
})


const upload = multer({ storage: storage })

router.route("/").get(activeCheack);
router.route("/post").post(upload.single('media'), createPost);
router.route("/postsAll").get(getAllPost);
router.route("/delete_post").post(deletePost);
router.route("/comment").post(comment);
router.route("/get_commetn").get(get_comment_by_post);
router.route("/delete_comment").post(delete_comment_by_user);
router.route("/incremetlikes").post(incrementLikes);

export default router;