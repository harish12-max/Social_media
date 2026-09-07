import express from "express";
import { registerUser,loginUser,getuser ,logoutUser ,getUserProfile} from "../controllers/user.controllers.js";
import { isAuthenticated } from "../middleware/authmiddleware.js";
const userRoutes = express.Router()


// Register User 
userRoutes.post("/register", registerUser)
userRoutes.post("/login" , loginUser)
userRoutes.post("/logout" , logoutUser )
userRoutes.get("/me" , isAuthenticated,getuser)
userRoutes.get("/profile/:username",getUserProfile)


//  login User 

export default userRoutes