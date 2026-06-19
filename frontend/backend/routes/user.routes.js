import { Router } from "express";
import { login, register, uploadProfilePicture, updateUserProfile, getUserAndProfile, updateProfileDate, getAllUserProfile, downloadProfile, sendConnectionRequest, getMyConnectionRequest, myConnections, accepteConnectionRequest } from "../controllers/userController.js";

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


router.route("/register").post(register);
router.route("/login").post(login);
router.route("/upload_profile_picture").post(upload.single('profile_picture'), uploadProfilePicture);
router.route("/user_update").post(updateUserProfile);
router.route("/get_user_profile").get(getUserAndProfile);
router.route("/update_profile_data").post(updateProfileDate);
router.route("/user/get_all_users").get(getAllUserProfile);
router.route("/user/download_resume").get(downloadProfile);
router.route("/user/send_connection_request").post(sendConnectionRequest);
router.route("/user/get_connection_request").get(getMyConnectionRequest);
router.route("/user/get_my_connection").get(myConnections);
router.route("/user/accept_connection_request").post(accepteConnectionRequest);



export default router;