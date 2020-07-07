const router = require('express').Router();
const controller = require('../controllers/todo');
const authetication = require('../middlewares/authentication');
const authorization = require('../middlewares/authorization');

router.use(authetication);
router.get('/', controller.read);
router.get('/:id', authorization, controller.filter);
router.post('/add', controller.add);
router.put('/:id', authorization, controller.update);
router.delete('/:id', authorization, controller.delete);

module.exports = router;