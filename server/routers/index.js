const router = require('express').Router();
const todoRoute = require('./todo');
const userRoute = require('./user');
const boredomRoute = require('./boredom');

router.get('/', (req,res) => {
    res.json({msg: "Welcome on Fancy App"})
})

router.use('/todos', todoRoute);
router.use('/', userRoute);
router.use('/boredom', boredomRoute);

module.exports = router;