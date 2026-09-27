import cloudnary from "./cloudnary.config.js";

const uploadtocloudnary = (buffer) => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudnary.uploader.upload_stream(
            {
                folder: "social-media/profile-images",
                resource_type: "image",
            },
            (error, result) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            },

        );

        uploadStream.end(buffer);
    })
}

export default uploadtocloudnary;