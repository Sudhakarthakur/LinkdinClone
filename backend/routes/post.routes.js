import { Router } from "express";
import { activeCheack, createPost, getAllPost } from "../controllers/postController.js";
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

export default router;