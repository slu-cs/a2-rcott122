//define a plan for collection
const mongoose = require('mongoose');

const Voter = new mongoose.Schema({
  first_name: String,
  last_name: String,
  zip_code: Number,
  history: [String]
});

//speed up queries on all fields
Voter.index({first_name: 1});
Voter.index({last_name: 1});
Voter.index({zip_code: 1});
Voter.index({history: 1});

//compile and export this schema
module.exports = mongoose.model('Voters', Voters);
