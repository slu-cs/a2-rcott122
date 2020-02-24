//query the voters database
const mongoose = require('mongoose');
const connect = require('./db');
const Voters = require('./schema');

connect(); //to the database

const queries = [

  //How many registered voters live in the Canton
  Voters.find().where('zip_code').equals(13617).count(), //had to look up count in javascript documantation

  //What are the full names of all the registered voters whose first name is STARR
  Voters.find().where('first_name').equals('STARR'),

  //How many people voted in the 2016 general election
  Voters.find().where('history').in('GE16').count(),

  //What is the last name that comes last in the county in alphabetical order
  Voters.find().sort('-last_name').limit(1), //had to look up limit in javascript documantation

  //How many zip codes does the county contain
  Voters.find().distinct('zip_code')
];

//run the queries
Promise.all(queries)
  .then(function(result) {
    console.log('Registered voters in Canton: ', result[0]);
    console.log('Voters named Starr: ', result[1].map(n => n.first_name +' '+ n.last_name));
    console.log('Voters that voted in the 2016 General Election: ', result[2]);
    console.log('Last alphabetical last name in the county: ', result[3].map(l => l.last_name));
    console.log('Amount of distinct zip codes in the county: ', result[4].length); //had to use length here due to an error I kept getting
    mongoose.connection.close();
  }).catch(error => console.error(error.stack));
