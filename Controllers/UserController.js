import User from "../models/User";
import bcrypt from "bcrypt";

export function registerUser(req,res){

    const data=req.body;

    data.password=bcrypt.hashSync(data.password,10)//salting round 10 means 10 time hashing
    const newUser = new User(data);

    newUser.save().then(()=>{
        res.json({message:"user register successsfuly"})
    }).catch((error)=>{
        res.status(500).json({error:"failed"})
    })
}
export function loginUser(req,res){
    const data =req.body;

    User.findOne({
        emial:data.email,  //check database email equal to entered email
    }).then(
        (user)=>{
            if(user==null){
                res.status(404).json({error:"User not found"});
            }else{
                const isPasswordCorrect = bcrypt.compareSync(data.password,user.password);

                if(isPasswordCorrect){
                    res.json({message:"Login successfuly"});
                }else{
                    res.status(401).json({error:"Login failed"});
                }
            }
        }
    );
}