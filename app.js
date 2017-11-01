const bodyParser  = require('body-parser'); // Plugin untuk mengambil data dari form
const express     = require('express');
const app         = express();

const index   = require('./routers/index');
const voters   = require('./routers/voters');
const result    = require('./routers/results');


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.set('views', './views') // specify the views directory
app.set('view engine', 'ejs') // register the template engine
app.use('/assets', express.static('assets'));
// app.use(express.static(__dirname));
app.use(express.static("./views"));

// ------------ INDEX --------------
app.use('/', index);
// ------------ VOTERS --------------
app.use('/voters', voters);
// ------------- TOP5 ---------------
app.use('/results/', result)

app.listen(3000, function() {
  console.log("Sedang Berjalan .... !!!!");
});
