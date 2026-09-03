import mongoose from "mongoose"

const userschema = new mongoose.Schema({
   name: {
      type: String,
      required: true
   },
   username: {
      type: String,
      required: true,
      unique: true
   },
   email: {
      type: String,
      required: true,
      unique: true
   },
   password: {
      type: String,
      require: true,

   },
   phone: {
      type: Number
   },
   bio: {
      type: String
   },
   followers: [
      //ids to be stored
   ],
   following: [
      //ids to be stored
   ],
   stories: [
      //ids to be stored
   ],
   reels: [
      // ids to be stored 
   ],
   posts: [
      // ids to be stored
   ],
   profileImage: {
      type: String
   }

})

const User = mongoose.model("User" ,userschema)
export default User;