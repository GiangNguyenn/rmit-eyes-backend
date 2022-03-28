const storage = require('../storage/storage-config')

module.exports = {
    upload: async (req, res) => {
        if (req.files === null) {
            return res.status(400).json({msg: 'No file uploaded'});
        }
        const file = req.files.file;
        const image =  storage.url(file);
        console.log('start upload file')
        const result = await storage.uploader.upload_url(image)
        return res.json({fileName: file.name, filePath: `/uploads/${file.name}`});
    }
}
