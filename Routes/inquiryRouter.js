import express from "express";
import { addInquiry, getInquiries } from "../Controllers/injuiryController.js";


const inquiryRouter = express.Router();

inquiryRouter.post("/",addInquiry);
inquiryRouter.post("/",getInquiries);

export default inquiryRouter;