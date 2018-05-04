const Project = require('./Project.js').project;
const db = require('./index.js');
const User = require('./Project.js').user;

function loadProject(projectId, callback) {
  Project.find({ id: projectId }, null, null, (error, project) => {
    if (error) {
      console.log('There has been an error retrieving this project:', error);
    } else {
      callback(project);
    }
  });
}

function loadBackers(backerIds, callback) {
  User.find({ id: { $in: backerIds } }, null, null, (error, backers) => {
    if (error) {
      console.log('There has been an error retrieving backer information:', error);
    } else {
      callback(backers);
    }
  });
}

module.exports.loadProject = loadProject;
module.exports.loadBackers = loadBackers;
