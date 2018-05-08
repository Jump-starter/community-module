const fs = require('fs');
const faker = require('faker');

/* eslint-disable */
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

const seedProjects = () => {
  const projectsHeader = 'title,creator\n';
  fs.writeFileSync('projects.csv', projectsHeader);

  for (let i = 0; i < 1000; i++) {
    let projectsBatch = '';
    for (let j = 0; j < 2000; j++) {
      let title = faker.lorem.word();
      let creator = faker.name.findName();
      projectsBatch += `${title}|${creator}\n`;
    }
    console.log(i);
    fs.appendFileSync('projects.csv', projectsBatch);
  }
};
// seedProjects();

const seedUsers = () => {
  const usersHeader = 'name,city,country,avatar\n'
  fs.writeFileSync('users.csv', usersHeader);

  let userID = 1;
  for (let i = 0; i < 4000; i++) {
    let userBatch = '';
    for (let j = 0; j < 2000; j++) {
      let avatarID = getRandomInt(0, 29);

      let name = faker.name.findName();
      let city = faker.address.city();
      let country = faker.address.country();
      let avatar = `https://s3-us-west-1.amazonaws.com/jumpstartercommunity/avatar${avatarID}.jpg`;
      userBatch += `${name}|${city}|${country}|${avatar}\n`;
    }
    console.log(i);
    fs.appendFileSync('users.csv', userBatch);
  }
};
seedUsers();

const seedProjectsUsers = () => {
  const projectsUsersHeader = 'users_id,projects_id\n'
  fs.writeFileSync('projects_users.csv', projectsUsersHeader);

  let userID = 1;
  for (let i = 0; i < 4000; i++) {
    let projectsUsersBatch = '';
    for (let j = 0; j < 2000; j++) {
      projectsUsersBatch += projectsUserIsBacking(userID);
      userID++;
    }
    console.log(i);
    fs.appendFileSync('projects_users.csv', projectsUsersBatch);
  }
}

const projectsUserIsBacking = (userID) => {
  let projectsUsersPairings = '';
  
  let numProjectsToBack = getRandomInt(1, 20);
  for (let i = 0; i < numProjectsToBack; i++) { // for each user back 1-20 random projects from 1 - 2m
    let randomProjectId = getRandomInt(1, 2000000);
    projectsUsersPairings += `${userID}|${randomProjectId}\n`;
  }
  
  return projectsUsersPairings;
}
// seedProjectsUsers();