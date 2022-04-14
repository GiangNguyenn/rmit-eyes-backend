const express = require('express');
const userController = require('../controllers/UserController')
const router = express.Router();

router.get('', (req, res) => {
    userController.get(req, res)
})

router.get('/findUser', async (req, res) => {
    await userController.getUser(req, res);
}
)

module.exports = router



