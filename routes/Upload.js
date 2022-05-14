const express = require("express");
const uploadController = require("../controllers/UploadController");
const router = express.Router();
const cloudinary = require("../storage/storage-config");
const streamifier = require("streamifier");
const multer = require("multer");
const fileUpload = multer();

router.post("", fileUpload.single("image"), async function (req, res, next) {
  let streamUpload = (req) => {
    return new Promise((resolve, reject) => {
      let stream = cloudinary.uploader.upload_stream((error, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
      });

      streamifier.createReadStream(req.files.file.data).pipe(stream);
    });
  };

  async function upload(req) {
    return await streamUpload(req);
  }

  const result = await upload(req);
  res.send(result.url);
});
module.exports = router;
