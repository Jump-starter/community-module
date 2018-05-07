const fs = require('fs');
const faker = require('faker');

/* eslint-disable */
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

const seedProjects = () => {
  let id = 1;
  for (let i = 0; i < 5000; i++) {
    let projectsBatch = '';
    for (let j = 0; j < 2000; j++) {
      const project = {};
      project.id = id;
      project.title = faker.lorem.word();
      project.creator = faker.name.findName();
      project.backerIDs = [];
      
      let numBackers = getRandomInt(20, 60);
      for (let k = 0; k < numBackers; k++) {
        let userID = getRandomInt(1, 8000000);
        project.backerIDs.push(userID);
      }

      projectsBatch += `${JSON.stringify(project)}\n`;
      id++;
    }
    console.log(i);
    fs.appendFileSync('projects.json', projectsBatch);
  }
};
// seedProjects();

const seedUsers = () => {
  let id = 1;
  for (let i = 0; i < 5000; i++) {
    let userBatch = '';
    for (let j = 0; j < 2000; j++) {
      let avatarID = getRandomInt(0, 29);

      const user = {};
      user.id = id;
      user.name = faker.name.findName();
      user.city = faker.address.city();
      user.country = faker.address.country();
      user.fundedProjects = getRandomInt(0, 20);
      user.avatar = `https://s3-us-west-1.amazonaws.com/jumpstartercommunity/avatar${avatarID}.jpg`;

      userBatch += `${JSON.stringify(user)}\n`;
      id++;
    }
    console.log(i);
    fs.appendFileSync('users.json', userBatch);
  }
}
seedUsers();

// select u.* from users u
// inner join projects_users pu
// on u.id = pu.users_id
// where pu.projects_id = 2123;

// select users backing a specific project