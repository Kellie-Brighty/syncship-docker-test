const express = require('express');
const Redis = require('ioredis');

const app = express();
const port = process.env.PORT || 8080;

// Connect to Redis using the service name defined in docker-compose.yml
const redis = new Redis({
  host: process.env.REDIS_HOST || 'redis',
  port: 6379,
});

app.get('/', async (req, res) => {
  try {
    const visits = await redis.incr('visits');
    res.send(`
      <h1>SyncShip Docker Test Successful! 🚢🐳</h1>
      <p>This page has been viewed <b>${visits}</b> times.</p>
      <p>If you see this, the Node.js container successfully talked to the Redis container using Docker networking!</p>
    `);
  } catch (err) {
    res.status(500).send('Error connecting to Redis: ' + err.message);
  }
});

app.listen(port, () => {
  console.log(`Demo app listening on port ${port}`);
});
