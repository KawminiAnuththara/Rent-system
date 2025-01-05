import express from "express";
import { addReview, approveReview, deleteReview, getReview } from "../Controllers/reviewController.js";

const reviewRouter = express.Router();
reviewRouter.post("/reviews",addReview)
reviewRouter.get("/",getReview)
/* reviewRouter.get("/:name",
    (req,res)=>{
        console.log(req.params.name)
    }
)
 */
reviewRouter.delete("/:email",deleteReview)  //:email =variable



/* reviewRouter.get("/approved",(req,res)=>{
    console.log("This is approved route")
})

reviewRouter.get("/:email",(req,res)=>{     //placed below in the page because it causes confused
    console.log("This is email route")
}) */

reviewRouter.put("/approve/:email",approveReview)


export default reviewRouter;