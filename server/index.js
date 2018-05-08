const express = require('express');
const pgClient = require('../db/postgres/index.js');
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
app.get('/api/community/:id', (req, res) => {
  const { id } = req.params;
  const projectQuery = `SELECT * FROM projects WHERE id = ${id}`;
  pgClient.query(projectQuery, (err, projectInfo) => {
    if (err) {
      res.status(500);
      res.send(err);
      return;
    }
    res.send(projectInfo);
    // pgClient.query(wineQuery, (err, winePairings) => {
    //   if (err) {
    //     res.status(500);
    //     res.send(err);
    //     return;
    //   }
    //   const recipe = recipeInfo.rows[0];
    //   if (recipe) {
    //     recipe.wines = winePairings.rows;
    //   }
    //   redisClient.set(id, JSON.stringify(recipe));
    //   res.send(recipe);
    // });
  });
});

app.listen(app.get('port'));
console.log('Listening on', app.get('port'));
