import express from "express";
import { loginUser, registerUser } from "../Controllers/UserController.js";

const userRouter=express.Router();

userRouter.post("/",registerUser);

userRouter.post("/login",loginUser);

export default userRouter;