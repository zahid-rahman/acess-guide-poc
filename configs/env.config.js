import dotenv from "dotenv";
dotenv.config();

export const envConfig = {
  imagga: {
    apiKey: process.env.IMAGGA_API_KEY,
    apiEndpoint: process.env.IMAGGA_API_ENDPOINT,
    secretKey: process.env.IMAGGA_API_SECRET,
  },
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET,
  },
};
