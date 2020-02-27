const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
corsOptions = {
  origin: "https://owli-chat-test.firebaseapp.com",
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));
app.use(morgan('dev'))
app.use(helmet())
app.use('/api', require('./api'))

module.exports = app


