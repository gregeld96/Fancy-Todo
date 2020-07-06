const router = require('express').Router();
const todoRoute = require('./todo');
const userRoute = require('./user');

router.get('/', (req,res) => {
    res.json({msg: "Welcome on Fancy App"})
})

router.use('/todos', todoRoute);
router.use('/', userRoute);

module.exports = router;