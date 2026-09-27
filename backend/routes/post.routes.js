import express from "express";
import { createPost, getPost, updateLikes } from "../controllers/post.controller";
import isAuthenticated from "../middleware/authmiddleware";
import upload from "../middleware/uploadMulter";


const postRoutes = express.Router();

postRoutes.post("/create", isAuthenticated, upload.single('image'), createPost);
postRoutes.get("/", isAuthenticated, getPost);
postRoutes.post("/likes/:id", isAuthenticated, updateLikes)


export default postRoutes;