const router = require('express').Router();
const controller = require('../controllers/boredom');

router.get('/activity', controller.findActivity);
router.get('/activity/:type', controller.activityType)

module.exports = router;