import mongoose from "mongoose";


const comments = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    },
    commnet: {
        type: String,
        required: true
    }
})

const Comments = mongoose.model("comments", comments);
export default Comments;