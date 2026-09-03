import express from "express";
import { registerUser,loginUser,getuser ,logoutUser } from "../controllers/user.controllers.js";
import { isAuthenticated } from "../middleware/authmiddleware.js";
const userRoutes = express.Router()


// Register User 
userRoutes.post("/register", registerUser)
userRoutes.post("/login" , loginUser)
userRoutes.get("/me" , isAuthenticated,getuser)
userRoutes.post("/logout" , logoutUser )


//  login User 

export default userRoutes