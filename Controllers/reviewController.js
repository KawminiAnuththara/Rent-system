import Review from "../models/Review";

export function addReview(req,res){
   if(req.user == null){
    res.status(401).json({
        message:"Please login and try again",
    });
    return;
   } 

   const data = req.body;

   data.name = req.user.firstName+ " " +req.user.lastName; //add the nameof the user to the review
   data.profilePicture=req.user.profilePicture;
   

   const newReview = new Review(data)
}