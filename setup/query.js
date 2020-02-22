//query the faculty database

const mongoose = require('mongoose');
const connect = require('./db');
const Professor = require('./schema');

connect(); // To the database

//what documents are in the collection
//const query = Professor.find();
//query.exec(function(error, professors){
  //if (error) console.error(error.stack);
  //console.log(professors);
//});

const queries = [

  //what are the names in alaphabetical order?
  Professor.find().sort ('name'),

  //who started modt recently?
  Professor.find().sort('-started').limit(1),

  //who started in 2003?
  Professor.find().where('started').equals(2003),

  //who teaches 362?
  Professor.find().where('courses').in(362),

  //what are all the ranks?
  Professor.distinct('rank')
];

// Run the queries in parallel
Promise.all(queries)
  .then(function(results) {
    console.log('Names in order: ', results[0].map(p => p.name));
    console.log('Started most recently: ', results[1].map(p => p.name));
    console.log('Started in 2003: ', results[2].map(p => p.name));
    console.log('Teaches 362: ', results[3].map(p => p.name));
    console.log('Distinct ranks: ', results[4]);
  }).catch(error => console.error(error.stack));

//queries[0].exec(function(error, professors){
  //if (error) console.error(error.stack);

  //const names = professors.map(p => p.name);
  //console.log('Names in order: ', names);
//});

// Professor.find().sort('-started').limit(1)
//queries[1].exec(function(error, professors) {
  //if (error) console.error(error.stack);

  //const names = professors.map(p => p.name);
  //console.log('Started most recently: ', names);
//});

// Professor.find().where('started').equals(2003)
//queries[2].exec(function(error, professors) {
  //if (error) console.error(error.stack);

  //const names = professors.map(p => p.name);
  //console.log('Started in 2003: ', names);
//});

// Professor.find().where('courses').in(362)
//queries[3].exec(function(error, professors) {
  //if (error) console.error(error.stack);

  //const names = professors.map(p => p.name);
  //console.log('Teaches 362: ', names);
//});

// Professor.distinct('rank')
//queries[4].exec(function(error, ranks) {
  //if (error) console.error(error.stack);

  //console.log('Distinct ranks: ', ranks);
//});
