const express = require('express');
const authController = require('../controllers/AuthController')
const router = express.Router();


router.post('/register', async (req, res)=> {
    await authController.register(req, res)
})

router.post('/login', async (req, res)=> {
    await authController.login(req, res)
})

router.post('', async (req, res)=> {
    req.send('hello world')
})

module.exports = router

