import express from "express";
import corse from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import postRoutes from "./routes/post.routes.js"
import userRoutes from "./routes/user.routes.js"

// Always see this

// first cheack type if( type == "commonjs") than use require for import 
// example:-
// const express = require("express");
// if(type == "module"){
//     than we import packages like this :-
//     import express from "express"
// }



dotenv.config();

const MONGO_URL = process.env.MONGO_URL;

const app = express();
app.use(corse());
app.use(express.json());
app.use(postRoutes)
app.use(userRoutes)
app.use(express.static("uploads"))

const start = async () => {
    try {
        await mongoose.connect(MONGO_URL);
        console.log("DB Connected")

        app.listen(9090, () => {
            console.log("Server is runnig on port 9090")
        })
    } catch (e) {
        console.log("Something is Wrong", e);
    }
}

start();


