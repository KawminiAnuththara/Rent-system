import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config();

export function registerUser(req, res) {
    const data = req.body;

    // Hash password with salting
    data.password = bcrypt.hashSync(data.password, 10);

    const newUser = new User(data);

    newUser
        .save()
        .then(() => {
            res.json({ message: "User registered successfully" });
        })
        .catch((error) => {
            if (error.code === 11000) { // Duplicate key error (unique email)
                res.status(400).json({ error: "Email already exists" });
            } else {
                res.status(500).json({ error: "Failed to register user" });
            }
        });
}

export function loginUser(req, res) {
    const data = req.body;

    User.findOne({ email: data.email }) // Corrected typo
        .then((user) => {
            if (user == null) {
                return res.status(404).json({ error: "User not found" });
            }

            const isPasswordCorrect = bcrypt.compareSync(data.password, user.password);

            if (isPasswordCorrect) {

                const token =jwt.sign({
                    firstName:user.firstName,
                    lastName:user.lastName,
                    email:user.email,
                    role:user.role,
                    profilePicture:user.profilePicture,
                    phone:user.phone,
                },process.env.JWT_SECRET)
                res.json({ message: "Login successful",token:token ,user:user});
            } else {
                res.status(401).json({ error: "Invalid email or password" });
            }
        })
        .catch(() => {
            res.status(500).json({ error: "Server error" });
        });
}
//admin checking always doing in this code to prevent that commonly used function 

export function isItAdmin(req){
    let isAdmin = false;
  
    if(req.user != null){
      if(req.user.role == "admin"){
        isAdmin=true;
      }
    }
    return isAdmin;
  }

  //check  user is customer

  export function isItCustomer(req){
    let isCustomer = false;
  
    if(req.user != null){
      if(req.user.role == "customer"){
        isCustomer=true;
      }
    }
    return isCustomer;
  }