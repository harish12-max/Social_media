import express from "express";
import { getReel, reelCreate, updatedReelLike } from "../controllers/reel.controller.js";
import isAuthenticated from "../middleware/authmiddleware.js";
import reelUpload from "../middleware/reeluploadMulter.js";


const reelRoutes = express.Router();


reelRoutes.post("/createReel" , isAuthenticated ,reelUpload.single('video') ,reelCreate)
reelRoutes.get("/" , isAuthenticated, getReel);
reelRoutes.post("/likes/:id" , isAuthenticated, updatedReelLike)


export default reelRoutes