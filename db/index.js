const mongoose = require('mongoose');
const mongoUri = 'mongodb://localhost/communityModule';

const db = mongoose.connect(mongoUri);

module.exports = db;