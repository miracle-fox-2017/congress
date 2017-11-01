const express = require('express');
const bodyParser = require('body-parser');
const home = require('./routers/home');
const results = require('./routers/results');
const voters = require('./routers/voters');


const app = new express();

app.use(bodyParser.urlencoded({ extended:false }));
app.use(bodyParser.json());

app.set('views','./views');
app.set('view engine','ejs');

app.use('/', home);
app.use('/', voters);
app.use('/', results);


app.listen('3000',function(){
    console.log('Selamat Mengerjakan');
});