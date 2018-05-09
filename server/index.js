require('newrelic');
const express = require('express');
const pgClient = require('../db/postgres/index.js');
const redis = require('redis');
const cors = require('cors');

const parser = require('body-parser');

const app = express();
module.exports.app = app;

// Set what we are listening on.
app.set('port', (process.env.PORT || 3006));

app.use(parser.json());
app.use(express.static(`${__dirname}/../client/dist`));
app.use(cors());

// Handle Get requests
// app.get('/api/community/:id', (req, res) => {
//   const { id } = req.params;
//   // grab project information
//   const projectQuery = `SELECT p.title, p.creator
//                         FROM projects p
//                         WHERE p.id = ${id}`;
//   // grab backers for project
//   const backersQuery = `SELECT u.*
//                         FROM users u
//                         INNER JOIN projects_users pu
//                         ON u.id = pu.users_id
//                         WHERE pu.projects_id = ${id}`;

//   pgClient.query(projectQuery, (err, projectInfo) => {
//     if (err) {
//       res.status(500);
//       res.send(err);
//       return;
//     }
//     pgClient.query(backersQuery, (err, backersInfo) => {
//       if (err) {
//         res.status(500);
//         res.send(err);
//         return;
//       }
//       const project = projectInfo.rows[0];
//       const backers = backersInfo.rows;
//       for (let i = 0; i < backers.length; i++) { // for each backer add a fundedprojects property to it
//         const backer = backers[i];
//         const backerID = backer.id;
//         const fundedProjects = `SELECT COUNT(*) FROM (
//                                   SELECT p.*
//                                   FROM projects p
//                                   INNER JOIN projects_users pu
//                                   ON p.id = pu.projects_id
//                                   WHERE pu.users_id = ${backerID}
//                                 ) projectcount`;
//         pgClient.query(fundedProjects, (err, fundedProjectCount) => {
//           if (err) {
//             res.status(500);
//             res.send(err);
//             return;
//           }
//           backer.fundedProjects = parseInt(fundedProjectCount.rows[0].count, 10);
//           if (i === backers.length - 1) { // if the all of the backers have been iterated through, add array of backers as backers property to result
//             project.backers = backers;
//             res.send(project);
//           }
//         });
//       }
//     });
//   });
// });

app.get('/api/community/:id', (req, res) => {
  const { id } = req.params;
  // grab project information
  const projectQuery = `SELECT p.title, p.creator
                        FROM projects p
                        WHERE p.id = ${id}`;
  // grab backers for project
  const backersQuery = `SELECT u.id, u.name, u.city, u.country, u.funded_project_count AS "fundedProjects", u.avatar
                        FROM users u
                        INNER JOIN projects_users pu
                        ON u.id = pu.users_id
                        WHERE pu.projects_id = ${id}`;

  pgClient.query(projectQuery, (err, projectInfo) => {
    if (err) {
      res.status(500);
      res.send(err);
      return;
    }
    pgClient.query(backersQuery, (err, backersInfo) => {
      if (err) {
        res.status(500);
        res.send(err);
        return;
      }
      const project = projectInfo.rows[0];
      const backers = backersInfo.rows;
      console.log(backers);
      
      project.backers = backers;
      res.send(project);
    });
  });
});

app.listen(app.get('port'));
console.log('Listening on', app.get('port'));
