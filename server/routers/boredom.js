const router = require('express').Router();
const controller = require('../controllers/boredom');
const authetication = require('../middlewares/authentication');

router.use(authetication);
router.get('/activity', controller.findActivity);
router.get('/activity/:type', controller.activityType)

module.exports = router;