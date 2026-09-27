import Reel from "../models/reel.model.js";
import User from "../models/user.model.js";
import cloudnary from "./cloudnary.config.js";


const uploadReelToCloudnary = async(buffer) =>{
    return new Promise((resolve, reject) => {
        const uploadStream = cloudnary.uploader.upload_stream(
            {
                folder: "social-media/reels",
                resource_type: "video"
            },
            (error, result) => {
                if (error) {
                    reject(error);
                    return;
                }

                resolve(result);
            }
        );

        uploadStream.end(buffer);
    });
}

export default uploadReelToCloudnary;