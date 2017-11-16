const mongoose = require('mongoose');
const Score = require('./score');
const createNewScore = require('./createNewScore');

mongoose.connect('mongodb://localhost/graphBook', {
  useMongoClient: true
})

const db = mongoose.connection;

//handle mongo error
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log( 'Connected to MongoDB.');
});

Score.remove().exec();

createNewScore();