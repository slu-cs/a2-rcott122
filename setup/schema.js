//define a plan for a collection

const mongoose = require('mongoose');
const fs = require('fs');
const readline = require('readline');
const file = readline.createInterface({
  input: fs.createReadStream('voters.csv')
});

// Create an array of objects, so that each line of the file is represented by an object with three properties.
const Voters = new mongoose.Schema({
const rows = [];
file.on('line', function(line) {
  const column = line.split(',');
  rows.push({
    first_name: column[0],
    last_name: column[1],
    zip_code: column[2],
    history: column[3]
  });
});
});

//speed up queries on all fields
Professor.index({first_name: 1});
Professor.index({last_name: 1});
Professor.index({zip_code: 1});
Professor.index({history: 1});

//compile and export this schema
module.exports = mongoose.model('Voters', Voters);
