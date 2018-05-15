const pgClient = require('../../db/postgres/index.js');
const redisClient = require('../../db/postgres/redis.js');


const handleGet = (req, res) => {
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

  redisClient.get(id, (err, result) => {
    if (result) {
      res.send(result);
    } else {
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

          if (project) { 
            project.backers = backers;
            redisClient.set(id, JSON.stringify(project));
            res.send(project);
          } else {
            res.send();
          }
        });
      });
    }
  });
}

module.exports.handleGet = handleGet;
