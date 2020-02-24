//store some data in the voters database
const mongoose = require('mongoose');
const connect = require('./db');
const Voter = require('./schema');
const fs = require('fs');
const readline = require('readline');

connect(); //to the database

const file = readline.createInterface({
  input: fs.createReadStream('voters.csv')
});

const rows = [];
file.on('line', function(line) {
  const column = line.split(',');
  rows.push(
    new Voter({
    first_name: column[0],
    last_name: column[1],
    zip_code: column[2],
    history: column[3]
  })
  );
 });


file.on('close', function() {
  //delete any previous data
  mongoose.connection.dropDatabase()
  .then(() => Promise.all(rows.map(s => s.save()))) //save all rows
  .then(() => mongoose.connection.close())
  .then(() => console.log('Ready.')) //let us know when database is ready
}).catch(error => console.error(error.stack));
