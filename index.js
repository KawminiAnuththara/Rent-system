import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import userRouter from "./Routes/UserRouter.js";
import productRouter from "./Routes/productRouter.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import reviewRouter from "./Routes/reviewRouter.js";
import inquiryRouter from "./Routes/inquiryRouter.js";
import cors from "cors";
import orderRouter from "./Routes/orderRouter.js";

dotenv.config();    //load environmental variable values

let app=express();

app.use(cors());

app.use(bodyParser.json());

app.use((req,res,next)=>{
    let token = req.header("Authorization");
    //create the auth

    if (token!=null){
        token=token.replace("Bearer ","");
        jwt.verify(token,process.env.JWT_SECRET,(err,decoded)=>{
            if(!err){
                req.user = decoded;
            }
        });
    }
    next()
})

//make connection

let mongoUrl=process.env.MONGO_URL;

mongoose.connect(mongoUrl);

let connection = mongoose.connection
connection.once("open",()=>{
    console.log("MongoDB connection established successfully")
})

app.use(express.json());

app.use("/api/users",userRouter);
app.use("/api/products", productRouter);
app.use("/api/reviews",reviewRouter);
app.use("/api/inquiries",inquiryRouter);
app.use("/api/orders",orderRouter);

// "email": "johndoe@examples.com",
//"password": "securepassword123",      admin

//"email": "jeny@examples.com",
//"password": "password123",         customer

app.listen(5000,()=>{
    console.log("running on port 5000");
})