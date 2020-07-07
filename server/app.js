require('dotenv').config()
const express = require('express');
const app = express();
const port = 4000;
const router = require('./routers')
const errhandler = require('./middlewares/errorHandler')

app.use(express.json())
app.use(express.urlencoded({extended:false}));

app.use(router);
app.use(errhandler);

app.listen(port, () => {
    console.log(`Listen on server http://localhost:${port}`);
})