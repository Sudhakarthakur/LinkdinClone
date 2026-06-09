import PDFDocuments from "pdfkit";
import Profile from "../models/profileModel.js";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import fs from 'fs'
import connenctionsRequest from "../models/connectonModel.js";

const convertUserDataTOPDF = async (userData) => {
    const doc = new PDFDocuments();

    const outputPath = crypto.randomBytes(32).toString("hex") + ".pdf";
    const strem = fs.createWriteStream("/uploads" + outputPath)
    doc.pipe(strem);

    doc.image(`uploads/${userData.userId.profilePicture}`, { align: "center", width: "100%" });
    doc.fontSize(14).text(`Name:${userData.userId.name}`)
    doc.fontSize(14).text(`UserName:${userData.userId.username}`)
    doc.fontSize(14).text(`Email:${userData.userId.email}`)
    doc.fontSize(14).text(`Bio:${userData.bio}`)
    doc.fontSize(14).text(`CurrentPost:${userData.currentPost}`)

    doc.font(14).text("Past Work")
    userData.pastWork.forEach((work, index) => {
        doc.fontSize(14).text(`Company:${work.company}`)
        doc.fontSize(14).text(`Position:${work.position}`)
        doc.fontSize(14).text(`Years:${work.year}`)
    })

    doc.end();
    return outputPath;
}


export const register = async (req, res) => {
    try {
        const { name, username, password, email } = req.body;

        if (!name || !username || !email || !password) return res.status(400).json({ message: "All fields are required" });

        const user = await User.findOne({ email });
        if (user)
            return res.status(400).json({ message: "User allready Exists" })

        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name, email, password: hashPassword, username
        })

        await newUser.save();
        const profile = new Profile({ userId: newUser._id })
        await profile.save();

        return res.json({ message: "User Created" })


    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}



export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) return res.status(400).json({ message: "Please Enter Email and Password" });
        const existUser = await User.findOne({ email });
        if (!existUser) {
            return res.status(404).json({ message: "user does not exits , register first" });
        }

        const isPasswordMatch = await bcrypt.compare(password, existUser.password);

        if (!isPasswordMatch) return res.status(400).json({ message: "Invalid username or password" });

        const token = crypto.randomBytes(32).toString("hex");

        await User.updateOne({ _id: existUser._id }, { token })
        return res.json({ token })

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}



export const uploadProfilePicture = async (req, res) => {
    const { token } = req.body;

    try {
        if (!token) {
            return res.status(400).json({ message: "Token is required" });
        }
        if (!req.file) {
            return res.status(400).json({ message: "File not uploaded" })
        }

        const user = await User.findOne({ token: token });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.profilePicture = req.file.filename;
        user.updatedAt = Date.now();
        await user.save();
        return res.json({ message: "Profile picture updated " })


    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}



export const updateUserProfile = async (req, res) => {

    const { token, ...newUserData } = req.bod;
    try {

        const user = await User.findOne({ token })
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        const { email, username } = newUserData;
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });

        if (existingUser) {
            if (existingUser || String(existingUser._id) !== String(user._id)) {
                return res.status(400).json({ message: "User already exists" })
            }
        }

        Object.assign(user, newUserData);
        await user.save();
        return res.json({ message: "User Updated" })

    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}


export const getUserAndProfile = async (req, res) => {
    const { token } = req.body;
    try {
        const user = await User.findOne({ token: token })
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        const userProfile = await Profile.findOne({ userId: user._id }).populate('userId', 'name email username profilePicture');
        return res.json(userProfile);
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

export const updateProfileDate = async (req, res) => {
    try {
        const { token, ...newProfileDate } = req.body;

        // here cheak user availabe or not using token
        const userProfile = await User.findOne({ token: token });
        if (!userProfile) {
            return res.status(400).json({ message: "User Not Found" });
        }


        //now get userprofile using user id
        const profile_to_update = await Profile.findOne({ userId: userProfile._id });

        // this is key feature to update all data in once operation and to avodi 
        // to write every single fileds 
        Object.assign(profile_to_update, newProfileDate);
        await profile_to_update.save();
        return res.json({ message: "Profile updated" })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}


export const getAllUserProfile = async (req, res) => {
    try {
        const profiles = await Profile.find().populate('userId', 'name username email profilePicture');
        return res.json({ profiles });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


export const downloadProfile = async (req, res) => {
    const user_id = req.body;
    const profile = await Profile.findOne({ userId: user_id }).populate('userId', 'name username email profilePicture');

    const outputPath = await convertUserDataTOPDF(profile);
    return res.json({ outputPath });
}


// understand veryCararyfull sendConnectionRequest, getMyConnectionRequest, myConnections} these functions
export const sendConnectionRequest = async (req, res) => {
    const { token, connectionId } = req.body;
    try {
        const user = await User.findOne({ token });
        if (!user) {
            res.status(404).json({ message: "User not found" });
        }

        const connectionUser = await User.findOne({ _id: connectionId });

        if (!connectionUser) {
            res.status(404).json({ message: "Connection User not found" });
        }

        const existReques = await connenctionsRequest.findOne({
            userId: user._id,
            connectionId: connectionUser._id
        })

        if (!existReques) {
            res.status(404).json({ message: "Connection Request already send" });
        }

        const requset = new connenctionsRequest({
            userId: user._id,
            connectionId: connectionUser._id
        })

        await requset.save();

        return res.json({ message: "Request send" })


    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export const getMyConnectionRequest = async (req, res) => {
    const { token } = req.body;
    try {
        const user = await User.findOne({ token });
        if (!user) {
            res.status(404).json({ message: "User not found" });
        }
        const connections = await connenctionsRequest.find({
            userId: user._id
        }).populate("connectionId", "name username email profilePicture");

        return res.json({ message: connections })
    } catch (err) {
        res.status(500).json({ message: err.message });
    }

}


export const myConnections = async (req, res) => {
    const { token } = req.body;
    try {
        const user = await User.findOne({ token });
        if (!user) {
            res.status(404).json({ message: "User not found" });
        }

        const connections = await connenctionsRequest.find({ connectionId: user._id }).populate(
            'userId', 'name username email profilePicture'
        )
        return res.json(connections);
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}


export const accepteConnectionRequest = async (req, res) => {
    const { token, requestId, action_type } = req.body;
    try {
        const user = await User.findOne({ token });
        if (!user) {
            res.status(404).json({ message: "User not found" });
        }

        const connection = await connenctionsRequest.findOne({ _id: requestId });

        if (action_type == "accept") {
            connection.status_accepted = true;
        } else {
            connection.status_accepted = false;
        }

        await connection.save();
        return res.json({ message: "Request Updated" })

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}