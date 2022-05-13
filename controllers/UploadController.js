const storage = require("../storage/storage-config");
const streamifier = require("streamifier");
const multer = require("multer");
const fileUpload = multer();

// module.exports = {
//     upload:  fileUpload.single('image'), async (req, res) => {
//         if (req.files === null) {
//             return res.status(400).json({msg: 'No file uploaded'});
//         }
//         const file = req.files.file;
//         console.log('file', file)
//         const image =  storage.url(file);
//         console.log('image', image)
//         const result = await storage.uploader.upload_url(image);
//         console.log('result ', result)
//         return res.json(result);
//     }
// }
