const express = require('express');
const bodyParser = require('body-parser')
const Result = require('./routers/resultRouter');
const Voters = require(`./routers/votersRouter`);
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.set('view engine', 'ejs')
app.set('views', './views')

app.use(`/results`, Result);
app.use(`/voters`, Voters);


// ======================================================================

app.get(`/`, (req, res) =>
  {
    res.render(`home`);
  }
)


app.listen(3000, () =>
  {
    console.log(`IT WORKS!`);
  }
)