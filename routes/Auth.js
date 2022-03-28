const express = require('express');
const authController = require('../controllers/AuthController')
const router = express.Router();

router.post('/login', (req, res) => {
    authController.login(req, res)
})

router.post('/register', (req, res)=> {
    authController.register(req, res)
})

module.exports = router

