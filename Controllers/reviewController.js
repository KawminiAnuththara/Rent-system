import Review from "../models/Review.js";

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
   data.email= req.user.email;

   const newReview = new Review(data)

   newReview.save().then(()=>{
    res.json({message:"Review added successfully"});
   }).catch((error)=>{
    res.status(500).json({error:"Review addition failed"});
   })
}
export function getReview(req,res){
    if(user == null || user.role != "admin"){
        Review.find({isApproved:true}).then((reviews)=>{
            res.json(reviews);
        })
        return
    }

    if(user.role == "admin"){
        Review.find().then((reviews)=>{
            res.json(reviews);
        })
    }
}
export function deleteReview(req,res){
    const email = req.params.email;

    //admin and paticular user can delete review

    if(req.user == null){
        res.status(401).json({
            message:"Please login and try again"
        });
        return
    }
    if(req.user.role == "admin"){
        Review.deleteOne({email:email}).then(()=>{
            res.json({message:"Review deleted successfully"});
        }).catch(()=>{
            res.status(500).json({error:"Review deletion failed"});
        });
        return
    }

    if(req.user.role == "customer"){
        if(req.user.email == email){    //check req api behind email equal to user email
            Review.deleteOne
            ({email:email}).then(()=>{
                res.json({message:"Review deleted successfully"});
            }).catch(()=>{
                res.status(500).json({error:"Review deletion failed"});
            });
        }
        else{
            res.status(403).json({message:"You are not authorized to perform this action"});
        }
    }
    
}

export function approveReview(req,res){
    const email=req.params.email;

    if(req.user == null){
        res.status(401).json({message:"Please login and try again"});
        return
    }

    if(req.user.role == "admmin"){
        Review.updateOne({
           email:email,
        },{

           isApproved:true,
        }).then(()=>{
            res.json({message: "Review approved successfully"});
        }).catch(()=>{
            res.status(500).json({error:"Review aproved failed"});
        });
    }else{
        res.status(403).json({message:"You are not authorized to perform this action"});
    }
}