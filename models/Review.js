//one user can send only one review
import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    email : {
        type:String,
        required : true,
        unique : true
    },
    name : {
        type:String,
        required : true,
    },
    rating : {
        type : Number,
        required : true,
    },
    comment : {
        type : String,
        required : true
    },
    date : {
        type : Date,
        required : true,
        default : Date.now()
    },
    profilePicture : {
        type : String,
        required : true,
        default :"https://static.vecteezy.com/system/resources/previews/009/734/564/non_2x/default-avatar-profile-icon-of-social-media-user-vector.jpg"
    },
    isApproved : {             //only approved review will show 
        type : Boolean,
        required : true,
        default : false,
    }
})

const Review = mongoose.model("Review",reviewSchema);

export default Review;