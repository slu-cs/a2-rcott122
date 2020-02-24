//query the voters database
const mongoose = require('mongoose');
const connect = require('./db');
const Voters = require('./schema');

connect(); //to the database

const queries = [

  //How many registered voters live in the Canton
  Voters.find().in('zip_code').equals(13617).count(),

  //What are the full names of all the registered voters whose first name is STARR
  Voters.find().where('first_name').equals('STARR'),

  //How many people voted in the 2016 general election
  Voters.find().where('history').in('GE16').count(),

  //What is the last name that comes last in the county in alphabetical order
  Voters.find().sort('-last_name').last(),

  //How many zip codes does the county contain
  Voters.find().filter('zip_codes').distinct()
];

//run the queries
Promise.all(queries)
  .then(function(results) {
    console.log('Registered voters in Canton: ', results[0]);
    console.log('Voters named Starr: ', results[1]);
    console.log('Voters that voted in the 2016 General Election: ', results[2]);
    console.log('Last alphabetical last name in the county: ', results[3]);
    console.log('Amount of distinct zip codes in the county: ', results[4]);
    mongoose.connection.close();
  }).catch(error => console.error(error.stack));
