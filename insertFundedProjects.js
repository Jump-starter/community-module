const pgClient = require('./db/postgres/index.js');

for (let i = 1; i < 8000001; i++) {
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
    pgClient.query(updateFundedProjectsQuery, async (err, res) => {
      await res;
      console.log(i);
      if (i === 8000000) {
        console.log('done');
        pgClient.end();
      }
    })
  });
}
