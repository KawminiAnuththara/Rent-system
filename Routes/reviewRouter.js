import express from "express";
import { addReview, getReview } from "../Controllers/reviewController.js";

const reviewRouter = express.Router();
reviewRouter.post("/reviews",addReview)
reviewRouter.get("/",getReview)
reviewRouter.get("/:name",
    (req,res)=>{
        console.log(req.params.name)
    }
)

export default reviewRouter;