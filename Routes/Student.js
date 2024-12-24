import express from "express";
import { getStudent, postStudent } from "../Controllers/StudentController.js";

let studentRouter = express.Router()

studentRouter.get("/",getStudent)

studentRouter.post("/",postStudent)

export default studentRouter;