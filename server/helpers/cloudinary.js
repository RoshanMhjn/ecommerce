const cloudinary = require("cloudinary").v2;
const multer = require("multer");

cloudinary.config({
  cloud_name: "diimk2ozq",
  api_key: "669915477155311",
  api_secret: "farMKgnBi94pEawA64JfKqYtNHU",
});

const storage = multer.memoryStorage();

async function imageUploadUtil(buffer, mimeType) {
  const result = await cloudinary.uploader.upload_stream(
    { resource_type: "auto", format: mimeType.split("/")[1] },
    (error, result) => {
      if (error) {
        console.log("Error uploading to Cloudinary:", error);
        throw error;
      }
      return result;
    }
  );

  result.end(buffer);
  return result;
}

const upload = multer({ storage });

module.exports = { upload, imageUploadUtil };
