//query the faculty database

const mongoose = require('mongoose');
const connect = require('./db');
const Voters = require('./schema');

connect(); //to the database

const queries = [

  //what are the names in alaphabetical order?
  Voters.find().in('zip_code').equals(13617).count(),

  //who started modt recently?
  Voters.find().where('first_name').equals('STARR'),

  //who started in 2003?
  Voters.find().where('history').in('GE16').count(),

  //who teaches 362?
  Voters.find().sort('-last_name').last(),

  //what are all the ranks?
  Voters.find().filter('zip_codes').distinct()
];

// Run the queries in parallel
Promise.all(queries)
  .then(function(results) {
    console.log('Registered votersin Canton: ', results[0]);
    console.log('Started most recently: ', results[1].map(p => p.name));
    console.log('Started in 2003: ', results[2].map(p => p.name));
    console.log('Teaches 362: ', results[3].map(p => p.name));
    console.log('Distinct ranks: ', results[4]);
  }).catch(error => console.error(error.stack));
