const logger = require("./logger");

const cloudinary = require("cloudinary").v2;

exports.uploadImg = async (imageId, image, callback) => {
  await cloudinary.uploader
    .upload_stream(
      {
        resource_type: "image",
        folder: "tiffy/items",
        public_id: imageId,
        width: 508,
        height: 320,
        crop: "scale",
      },
      callback
    )
    .end(image.buffer);
};

exports.upload = async (id, video, callback) => {
  await cloudinary.uploader
    .upload_stream(
      {
        resource_type: "auto",
        folder: "tiffy/forum",
        public_id: id,
      },
      callback
    )
    .end(video.buffer);
};

exports.delete = async (imageId) => {
  cloudinary.uploader.destroy(imageId)
    .then(() => { logger.info(`Cloudinary image deleted [Id : ${imageId}]`); });
}