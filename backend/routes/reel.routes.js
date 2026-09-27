import express from "express";
import { getReel, reelCreate, updatedReelLike } from "../controllers/reel.controller";
import isAuthenticated from "../middleware/authmiddleware";
import reelUpload from "../middleware/reeluploadMulter";


const reelRoutes = express.Router();


reelRoutes.post("/createReel" , isAuthenticated ,reelUpload.single('video') ,reelCreate)
reelRoutes.get("/" , isAuthenticated, getReel);
reelRoutes.post("/likes/:id" , isAuthenticated, updatedReelLike)


export default reelRoutes