var mongoose = require('mongoose');
var config = require('../config/config.js');

exports.mongoose = mongoose;

exports.db = mongoose.createConnection(config.DBHOST,config.DBNAME);
