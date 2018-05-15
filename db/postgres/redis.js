const redis = require('redis');

const redisClient = redis.createClient({ host: process.env.REDIS_PORT });

redisClient.on('error', (err) => {
  console.log(`redis error: ${err}`);
});

module.exports = redisClient;
