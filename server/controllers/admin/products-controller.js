const { imageUploadUtil } = require("../../helpers/cloudinary");

const handleImageUpload = async (req, res) => {
  try {
    const file = req.file;
    const result = await imageUploadUtil(file.buffer, file.mimetype);

    const imageUrl = result.secure_url;
    const publicId = result.public_id;

    console.log(imageUrl);

    res.json({
      success: true,
      url: imageUrl,
      publicId,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "An error occurred while uploading the image.",
    });
  }
};
module.exports = { handleImageUpload };
