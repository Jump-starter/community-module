const pg = require('pg');

const pgClient = new pg.Client({
  host: 'localhost',
  user: 'careylee',
  database: 'community',
});

pgClient.connect();

module.exports = pgClient;
