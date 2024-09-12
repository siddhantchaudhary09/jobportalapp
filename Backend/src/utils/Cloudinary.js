import { v2 as cloudinary } from 'cloudinary';
import { ApiError } from './ApiError.js';
import fs from "fs"

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});
const uploadCloudinary = async(file, folder, height, quality) =>  {
    const options = { folder };

    if (height) options.height = height;
    if (quality) options.quality = quality; // height and quality is used to image compression
    options.resource_type = "auto"; // it auto fetch image type;
  
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}

export {uploadCloudinary};