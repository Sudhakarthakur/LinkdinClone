import mongoose from "mongoose";


const postSchema = mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    body: {
        type: String,
        required: true
    },
    createAt: {
        type: Date,
        default: Date.now
    },
    updateAt: {
        type: Date,
        default: Date.now
    },
    likes: {
        type: Number,
        default: 0
    },
    media: {
        type: String,
        default: ""
    },
    fileType: {
        type: String,
        default: ""
    },
    active: {
        type: Boolean,
        default: true
    }

})

const Post = mongoose.model("Post", postSchema);
export default Post;