import mongoose from "mongoose";


const connectonRequest = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    connectionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    status_accepted: {
        type: Boolean,
        default: null
    }
})

const connenctionsRequest = mongoose.model("connectionRequest", connectonRequest);
export default connenctionsRequest;