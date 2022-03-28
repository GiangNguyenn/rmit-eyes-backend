const express = require('express');
const userController = require('../controllers/UserController')
const router = express.Router();

router.get('', (req, res) => {
    userController.get(req, res)
})

module.exports = router



