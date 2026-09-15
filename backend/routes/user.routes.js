import express from "express";
import { registerUser,loginUser,getuser ,logoutUser ,getUserProfile,followUser,unfollowUser} from "../controllers/user.controllers.js";
import { isAuthenticated } from "../middleware/authmiddleware.js";
const userRoutes = express.Router()



userRoutes.post("/register", registerUser)
userRoutes.post("/login" , loginUser)
userRoutes.post("/logout", isAuthenticated , logoutUser )
userRoutes.get("/me" , isAuthenticated,getuser)
userRoutes.get("/profile/:username",  isAuthenticated ,getUserProfile)

userRoutes.post("/:id/follow" , isAuthenticated, followUser)
userRoutes.delete("/:id/follow",isAuthenticated,unfollowUser)


 

export default userRoutes