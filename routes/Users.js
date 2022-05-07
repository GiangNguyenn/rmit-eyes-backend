const express = require('express');
const userController = require('../controllers/UserController')
const router = express.Router();

router.get('', async (req, res) => {
    await userController.getUsers(req, res)
})

router.get('/findUser', async (req, res) => {
    await userController.getUser(req, res);
})

router.put('/user/approve', async (req, res) => {
    await userController.updateUserStatus(req, res)
})

router.post('/check-in', async (req, res) => {
    await userController.checkIn(req, res)
})

router.get('/check-in', async (req, res) => await userController.getCheckInRecords(req, res))


module.exports = router



