const express = require('express');
const router = express.Router();
const controller = require('../controllers/animalController');
const auth = require('../middlewares/authMiddleware');

router.post('/', controller.cadastrar);
router.post('/adotar', auth, controller.adotar);
router.get('/adotados', controller.adotados);

module.exports = router;
