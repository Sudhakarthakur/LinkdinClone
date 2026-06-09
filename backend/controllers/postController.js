import Post from "../models/postModel.js";
import Profile from "../models/profileModel.js";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";


export const activeCheack = async (req, res) => {
    return res.status(200).json({ message: "RUNNING" });
}


export const createPost = async (req, res) => {
    const { token } = req.body;
    try {
        const user = await User.findOne({ token });
        if (!user) {
            res.status(404).json({ message: "User not found" });
        }

        const post = new Post({
            userId: user._id,
            body: req.body.body,
            media: req.file != undefined ? req.file.filename : "",
            fileType: req.file != undefined ? req.file.mimetype.split("/")[1] : "",
        })

        await post.save();
        return res.status(200).json({ message: "Post Created" })


    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

export const getAllPost = async (req, res) => {
    try {
        const posts = await Post.find({}).populate('userId', 'name username email profilePicture')
        return res.json({ posts })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

