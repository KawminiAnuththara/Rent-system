import mongoose from "mongoose";

let studentSchema = mongoose.Schema({   //make structure --how to save data
            name: String,
            age : Number,
            height : Number
        })
         
        //directly connect to the database with the javascript code
        let Student = mongoose.model("students",studentSchema)


        export default Student