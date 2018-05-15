const pg = require('pg');

const pgClient = new pg.Pool({
  host: 'community.ccwgyco2sbnt.us-west-1.rds.amazonaws.com',
  user: 'careylee',
  password: process.env.PGPASSWORD,
  database: 'communitydb',
});

pgClient.connect((err, client, release) => {
  if (err) return console.error('Error acquiring client', err.stack);
  console.log('hellooo');
});

module.exports = {
  query: (text, fn) => pgClient.query(text, fn)
};
