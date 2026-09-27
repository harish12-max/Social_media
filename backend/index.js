import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import userRoutes from "./routes/user.routes.js";
import postRoutes from "./routes/post.routes.js";
import reelRoutes from "./routes/reel.routes.js";




dotenv.config()
const app = express()
const port = 8055

app.use(express.json())
app.use(cookieParser())


mongoose.connect(process.env.dbURL).then(() => {
    console.log("DB Connected") 
}).catch((err) => {
    console.log(err)
})


app.use(cors({
    origin: 'http://localhost:5173', // Must match exact frontend URL
    credentials: true,
}))

app.use("/user", userRoutes)
app.use("/post" , postRoutes)
app.use("/reel" , reelRoutes)



app.listen(port, () => {
    console.log(`Server started at ${port}`)
})
