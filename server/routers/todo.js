const router = require('express').Router();
const controller = require('../controllers/todo');

router.get('/', controller.read);
router.get('/:id', controller.filter);
router.post('/add', controller.add);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

module.exports = router;