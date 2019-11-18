const mongoose = require('mongoose');

const db = mongoose.connect('mongodb://localhost:27017/notable', { useNewUrlParser: true, useUnifiedTopology: true } );

db
  .then(db => console.log('Connected to mongoDB'))
  .catch(err => {
    console.log('Can not connect to mongoDB: ' + err)
  });

module.exports = db;
