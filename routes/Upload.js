const express = require('express');
const uploadController = require('../controllers/UploadController')
const router = express.Router();

router.post('', (req, res) => {
    uploadController.upload(req, res)
})

module.exports = router

