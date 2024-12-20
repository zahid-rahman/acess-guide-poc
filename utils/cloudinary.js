import fs from "fs";
import path from "path";
import { envConfig } from "../configs/env.config.js";
export async function uploadFileToCloudinary(file, fileType) {
  const cloudinaryFolder =
    fileType == "IMAGE" || "VIDEO" ? "test-img" : "test-vid";
  const cloudinaryImageLink = await uploadToCloudinary(file, cloudinaryFolder);
  return cloudinaryImageLink.secure_url;
}

// function uploadToCloudinary(file, folderName, resourceType) {
//   cloudinary.config({
//     cloud_name: envConfig.cloudinary.cloudName,
//     api_key: envConfig.cloudinary.apiKey,
//     api_secret: envConfig.cloudinary.apiSecret,
//   });

//   return new Promise((resolve, reject) => {
//     cloudinary.uploader.upload(
//       file.path,
//       {
//         folder: folderName ? folderName : "test",
//         resource_type: resourceType || "auto",
//       },
//       (error, result) => {
//         fs.unlinkSync(file.path);
//         if (error) {
//           reject(error);
//         } else {
//           resolve(result);
//         }
//       }
//     );
//   });
// }

// async function uploadToCloudinary(file, folderName, resourceType) {
//   const { v2: cloudinary } = await import("cloudinary");

//   cloudinary.config({
//     cloud_name: envConfig.cloudinary.cloudName,
//     api_key: envConfig.cloudinary.apiKey,
//     api_secret: envConfig.cloudinary.apiSecret,
//   });

//   return new Promise((resolve, reject) => {
//     cloudinary.uploader.upload(
//       file.path,
//       {
//         folder: folderName ? folderName : "test",
//         resource_type: resourceType || "auto",
//       },
//       (error, result) => {
//         fs.unlinkSync(file.path);
//         if (error) {
//           reject(error);
//         } else {
//           resolve(result);
//         }
//       }
//     );
//   });
// }


async function uploadToCloudinary(file, folderName, resourceType) {
    const { v2: cloudinary } = await import("cloudinary");
  
    cloudinary.config({
      cloud_name: envConfig.cloudinary.cloudName,
      api_key: envConfig.cloudinary.apiKey,
      api_secret: envConfig.cloudinary.apiSecret,
    });
  
    return new Promise((resolve, reject) => {
      let filePath = file.path || file; // Handle both file object and string input
  
      if (!fs.existsSync(filePath)) {
        reject(new Error(`File does not exist: ${filePath}`));
        return;
      }
  
      cloudinary.uploader.upload(
        filePath,
        {
          folder: folderName || "test",
          resource_type: resourceType || "auto",
        },
        (error, result) => {
          // Remove file if it exists locally
        //   if (fs.existsSync(filePath)) {
        //     fs.unlinkSync(filePath);
        //   }
  
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
    });
  }
  