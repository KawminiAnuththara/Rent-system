import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import userRouter from "./Routes/UserRouter.js";


let app=express();

app.use(bodyParser.json());

//make connection

let mongoUrl="mongodb+srv://admin:1234@cluster0.qdczm.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(mongoUrl);

let connection = mongoose.connection
connection.once("open",()=>{
    console.log("MongoDB connection established successfully")
})


app.use("/api/users",userRouter);



app.listen(3000,()=>{
    console.log("hello");
})