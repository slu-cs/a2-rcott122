//this script provides a function for connecting to the database.

const mongoose = require('mongoose');

module.exports = function() {

  //avoid warnings
  mongoose.set('useNewUrlParser', true);
  mongoose.set('useUnifiedTopology', true);
  mongoose.set('useCreateIndex', true);
  mongoose.set('useFindAndModify', false);

  //start connecting
  mongoose.connect('mongodb://localhost/voters');

  //log errors
  mongoose.connection.on('error', function(error) {
    console.error(error.stack);
  });
};
