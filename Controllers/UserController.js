import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config();

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body; // Ensure password is received

    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }

    // Hash password securely
    const saltRounds = 10; // Define salt rounds
    const hashedPassword = bcrypt.hashSync(password, saltRounds);

    // Save user (replace with your DB logic)
    const newUser = {
      name,
      email,
      password: hashedPassword, // Store hashed password
    };

    // Send response
    res.status(201).json({ message: "User registered successfully!", user: newUser });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error during registration" });
  }
};

export { registerUser };

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