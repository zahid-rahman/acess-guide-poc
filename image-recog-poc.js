/**
 * This POC ensures checking image alt tag with some 3rd party api. This 3rd party api will give some tags based on given image. It will be helpful for checking the alt tag with the given tag. From the given tag we are recommending the best one
 */
import axios from "axios";
import { envConfig } from "./configs/env.config.js";
import { uploadFileToCloudinary } from "./utils/cloudinary.js";

/** imagga API integration */
async function callApi(imageUrl) {
  console.log("Image url", imageUrl);
  try {
    /**
     * 3rd party network request (imagga)
     */
    const response = await axios({
      url: `${
        envConfig.imagga.apiEndpoint
      }/v2/tags?image_url=${encodeURIComponent(imageUrl)}`,
      auth: {
        username: envConfig.imagga.apiKey,
        password: envConfig.imagga.secretKey,
      },
    });
    /**
     * print search result
     */
    searchResult(response.data.result.tags);
  } catch (error) {
    console.error(error);
  }
}


async function main() {
  /**
   * This is for local url
   */
  const imageUrl = "./assets/headphone.png";
  /** 
   * store image into cloudinary (cloud storage)
   * This is only applicable for local assets
   */
  const url = await uploadFileToCloudinary(imageUrl, "IMAGE");
  callApi(url);

  /** 
   * This is for cloud url
   */
  // const imageUrl = "https://panda-emart.netlify.app/images/banner-images/tv.png";
  // callApi(url);
}

/** 
 * call main function
 */
main();

/** 
 * Search result transformer function
 */
function searchResult(res) {
  const response = Array.from(res);
  if (response?.length <= 0) throw new Error("No response found");
  console.log("\x1b[32mResponse API result\x1b[0m", response);
  const filteredResponseBasedOnScore = response.filter(
    (el) => el.confidence <= 100 && el.confidence >= 50
  );
  console.log(
    "\x1b[32mFiltered response based on confidence score\x1b[0m",
    filteredResponseBasedOnScore
  );

  const finalResult = filteredResponseBasedOnScore.reduce(
    (max, item) => (item.confidence > max.confidence ? item : max),
    filteredResponseBasedOnScore[0]
  );
  console.log("\x1b[32mfinal recommendation\x1b[0m", finalResult);
}
