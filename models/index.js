const mongoose = require('mongoose');
const dbConfig = require('../config/db.config.js');
const user = require('./user.model.js')(mongoose);
mongoose.Promise = global.Promise;

const db = {
    mongoose: mongoose,
    url: dbConfig.url,
    user: user
}

module.exports = db;