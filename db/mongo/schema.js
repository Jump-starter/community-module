const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/community');

mongoose.Promise = global.Promise;

const projectSchema = new mongoose.Schema({
  id: Number,
  title: String,
  creator: String,
  backerIds: [Number],
});

const userSchema = new mongoose.Schema({
  id: Number,
  name: String,
  city: String,
  country: String,
  fundedProjects: Number,
  avatar: String,
});

const Project = mongoose.model('Project', projectSchema);

const User = mongoose.model('User', userSchema);

module.exports.project = Project;
module.exports.user = User;
