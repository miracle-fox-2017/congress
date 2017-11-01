const app = require('express')();
const bodyParser = require('body-parser');
const ejs = require('ejs');

const index = require('./routes/index');
const top5 = require('./routes/top5');
const voters = require('./routes/voters');
const cheating = require('./routes/cheating');

app.set('views', './views');
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', index);
app.use('/results/top5', top5);
app.use('/voters', voters);
app.use('/results/analyzed', cheating);

app.listen('3000', () => {
  console.log(`App started on port 3000`);
});