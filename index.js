import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
//import Student from "./models/Student.js";
import studentRouter from "./Routes/Student.js";

let app=express();

app.use(bodyParser.json());

//make connection

let mongoUrl="mongodb+srv://admin:1234@cluster0.qdczm.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(mongoUrl);

let connection = mongoose.connection
connection.once("open",()=>{
    console.log("MongoDB connection established successfully")
})

// get data from database
app.use("/students",studentRouter)




app.listen(3000,()=>{
    console.log("hello");
})