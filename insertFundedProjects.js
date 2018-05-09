const pgClient = require('./db/postgres/index.js');

for (let i = 1; i < 1000; i++) {
  const backedProjectCountQuery = `SELECT COUNT(*) FROM (
                                    SELECT p.*
                                    FROM projects p
                                    INNER JOIN projects_users pu
                                    ON p.id = pu.projects_id
                                    WHERE pu.users_id = ${i}
                                  ) projectcount`;
  pgClient.query(backedProjectCountQuery, (err, result) => {
    const fundedProjectCount = result.rows[0].count;
    const updateFundedProjectsQuery = `UPDATE users
                                       SET fundedProjects = fundedProjects + ${fundedProjectCount}
                                       WHERE id = ${i}`
    pgClient.query(updateFundedProjectsQuery, (err, res) => {
      if (i === 999) {
        console.log('done')
        pgClient.end();
      }
    })
  });
}