const router = require('express').Router();
const controller = require('../controllers/user');

router.post('/register', controller.register);
router.post('/login', controller.login);
router.post('/googlelogin', controller.googleLogin);

module.exports = router;