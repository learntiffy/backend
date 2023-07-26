const cloudinary = require("cloudinary").v2;

exports.upload = async (imageId, image, callback) => {
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

exports.delete = async (imageId) => {
  cloudinary.uploader.destroy(imageId)
    .then(() => { console.log(`Image deleted [Id : ${imageId}]`); });
}