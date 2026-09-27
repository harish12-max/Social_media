import express from "express";
import { createPost, getPost, updateLikes } from "../controllers/post.controller.js";
import isAuthenticated from "../middleware/authmiddleware.js";
import upload from "../middleware/uploadMulter.js";


const postRoutes = express.Router();

postRoutes.post("/create", isAuthenticated, upload.single('image'), createPost);
postRoutes.get("/", isAuthenticated, getPost);
postRoutes.post("/likes/:id", isAuthenticated, updateLikes)


export default postRoutes;