//customer can only write inquiry

import Inquiry from "../models/inquiry.js";
import { isItAdmin, isItCustomer } from "./UserController.js"


//add inquiries
export async function addInquiry(req,res){
    try {
        if(isItCustomer(req)){
            const data = req.body
            data.email =req.user.email
            data.phone =req.user.phone

            //generate key
            let id =0;  //assign id=0

            //get last id in the backend
            const inquiries = await Inquiry.find().sort({id:-1}).limit(1); //give id in decending order and limit one 

            if(inquiries.length==0){   //if no one here in inquiry then id is equal one
                id=1;
            }else{
                id=inquiries[0].id+1;  //else id equal last id plus one
            }

            data.id =id;   //data id is equal to  we created id

            const newInquiry = new Inquiry(data);
            const response = await newInquiry.save();

            res.json({
                message :"Inquiry added successfully",
                id:response.id
            })
        }
        
    } catch (e) {
        res.status(500).json({
            message:"Failed to add inquiry"
        })
    }
}
//view inquiries
// in here there are few requirements 
//1)check user has login
//2)customer can view only there own inquiries
//3)admin can view all inquiries

export async function getInquiries(req,res){
    try {
        if(isItCustomer(req)){
            const inquiries = await Inquiry.find({email:req.user.email});
            res.json(inquiries);
            return;
        }else if(isItAdmin(req)){
            const inquiries =await Inquiry.find();
            res.json(inquiries);
            return;
        }else{
            res.status(403).json({
                message:"You are not authorized to perform this action"
            })
            return;
        }
    } catch (e) {
        res.status(500).json({
            message:"Failed to get inquiries"
        })
    }
}