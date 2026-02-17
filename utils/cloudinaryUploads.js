const cloudinary = require("cloudinary").v2;

const uploadToCloudinary = (fileBuffer, userId)=> {
    return new Promise((resolve, reject)=>{

        const stream = cloudinary.uploader.upload_stream(
            {
                folder: "uploads",
                resource_type: "auto",
                public_id: `resume_${userId}`,
                overwrite: true 
            },
            (error, result)=>{
                if (error) return reject(error);
                resolve(result)
            }
        );

        stream.end(fileBuffer);
    })
}

module.exports = uploadToCloudinary 