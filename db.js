const mongoose = require('mongoose')
mongoose.set('useCreateIndex', true);
const { CONNECTION_STRING } = require('./config')

const conn = () => {
  return mongoose.connect(CONNECTION_STRING, { 
      useNewUrlParser: false,
      useUnifiedTopology: true,
      useNewUrlParser: true
  })
};

module.exports = conn