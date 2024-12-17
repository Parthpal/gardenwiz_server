import { v2 as cloudinary } from 'cloudinary';
import config from '../config';
import multer from 'multer';
export const sendImageToCloudanary=async (imageName:string,path:string)=>{
      try {
        // Configuration
        cloudinary.config({
            cloud_name: config.cloudinary_cloud_name,
            api_key: config.cloudinary_api_key,
            api_secret: config.cloudinary_api_secret,
        });

        // Upload an image
        const uploadResult = await cloudinary.uploader.upload(path, {
            public_id: imageName,
        });

       // console.log("Upload Result:", uploadResult); // Optional: Log for debugging
        return uploadResult; // Return the result
      } catch (error) {
        console.error("Error uploading to Cloudinary:", error);
        return null; // Return null in case of an error
      }
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, process.cwd()+'/src/uploads/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  
export const upload = multer({ storage: storage })