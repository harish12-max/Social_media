import express from "express";
import { registerUser,loginUser,getuser ,logoutUser ,getUserProfile,followUser,unfollowUser, updateProfile} from "../controllers/user.controllers.js";
import { isAuthenticated } from "../middleware/authmiddleware.js";
import upload from "../middleware/uploadMulter.js";
const userRoutes = express.Router()



userRoutes.post("/register", registerUser)
userRoutes.post("/login" , loginUser)
userRoutes.post("/logout", isAuthenticated , logoutUser )
userRoutes.get("/me" , isAuthenticated,getuser)
userRoutes.get("/profile/:username",  isAuthenticated ,getUserProfile)
userRoutes.patch("/profile/:username" ,isAuthenticated, upload.single("profileImage"), updateProfile)

userRoutes.post("/:id/follow" , isAuthenticated, followUser)
userRoutes.delete("/:id/follow",isAuthenticated,unfollowUser)



 

export default userRoutes