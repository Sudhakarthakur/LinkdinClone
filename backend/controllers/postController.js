import Post from "../models/postModel.js";
import Profile from "../models/profileModel.js";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import Comments from "../models/commentModel.js";


export const activeCheack = async (req, res) => {
    return res.status(200).json({ message: "RUNNING" });
}


export const createPost = async (req, res) => {
    const { token } = req.body;
    try {
        const user = await User.findOne({ token });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
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
        return res.status(500).json({ message: err.message })
    }
}

export const getAllPost = async (req, res) => {
    try {
        const posts = await Post.find({}).populate('userId', 'name username email profilePicture')
        return res.json({ posts })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}


export const deletePost = async (req, res) => {
    const { token, post_id } = req.body;
    try {
        const user = await User.findOne({ token: token }).select("_id");
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        const post = await Post.findOne({ _id: post_id });

        if (!post) {
            return res.status(404).json({ message: "post are not available" });
        }

        if (post.userId.toString() !== user._id.toString()) {
            return res.status(404).json({ message: "Unauthorized" });
        }

        await Post.deleteOne({ _id: post_id })
        return res.status(200).json({ message: "Post Deleted" });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}


export const comment = async (req, res) => {
    const { token, post_id, commentBody } = req.body;
    try {
        const user = await User.findOne({ token: token }).select("_id");
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        const post = await Post.findOne({ _id: post_id });

        if (!post) {
            return res.status(404).json({ message: "post are not available" });
        }


        // for issue to post comment than cheak this attribute and commmentModel field
        const comment = new Comments({
            userId: user._id,
            postId: post._id,
            commnet: commentBody
        })

        await comment.save();
        return res.status(200).json({ message: "Comment Added" })

    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}


export const get_comment_by_post = async (req, res) => {
    const { post_id } = req.body;

    try {
        const post = await Post.findOne({ _id: post_id });
        if (!post) {
            return res.status(404).json({ message: "Post not found" })
        }

        return res.json({ comments: post.comments })
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}


export const delete_comment_by_user = async (req, res) => {
    const { token, comment_id } = req.body;
    try {
        const user = await User.findOne({ token: tokne }).select("_id");

        if (!user) {
            return res.status(404).json({ message: "user not Found" })
        }

        const comment = await Comments.findOne({ "_id": comment_id });
        if (!comment) {
            return res.status(404).json({ message: "comment not found" });

        }

        await Comments.deleteOne({ "_id": comment_id });
        return res.json({ message: "Comment deleted" })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}


export const incrementLikes = async (req, res) => {
    const { post_id } = req.body;

    try {
        const post = await Post.findOne({ _id: post_id });
        if (!post) {
            return res.status(404).json({ message: "Post not found" })
        }

        post.likes = post.likes + 1;
        await post.sava();
        return res.json({ message: "Post liked" })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

}