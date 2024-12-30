import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import userRouter from "./Routes/UserRouter.js";
import productRouter from "./Routes/productRouter.js";
import jwt from "jsonwebtoken";


let app=express();

app.use(bodyParser.json());

app.use((req,res,next)=>{
    let token = req.header("Authorization");
    //create the auth

    if (token!=null){
        token=token.replace("Bearer ","");
        jwt.verify(token,'kv-secret-89!',(err,decoded)=>{
            if(!err){
                req.user = decoded;
            }
        });
    }
    next()
})

//make connection

let mongoUrl="mongodb+srv://admin:1234@cluster0.qdczm.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(mongoUrl);

let connection = mongoose.connection
connection.once("open",()=>{
    console.log("MongoDB connection established successfully")
})


app.use("/api/users",userRouter);
app.use("/api/products", productRouter);


app.listen(3000,()=>{
    console.log("hello");
})