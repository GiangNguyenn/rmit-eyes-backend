const express = require('express');
const rootController = require('../controllers/RootController');
const router = express.Router();

router.get('/', (req, res) => {
  rootController.get(req, res);
});

module.exports = router;
