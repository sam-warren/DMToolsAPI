import mongoose from 'mongoose';
import { mongodbUri, redisClient, prewarmCache } from './util/index';
import createApp from './server';

const start = async () => {
  await mongoose.connect(mongodbUri);
  console.log('Database connection ready');

  redisClient.on('error', err => console.log('Redis Client Error', err));

  await redisClient.connect();
  console.log('Redis connection ready');

  console.log('Flushing Redis');
  await redisClient.flushAll();

  console.log('Prewarm Redis');
  await prewarmCache();

  console.log('Setting up Express server');
  const app = await createApp();

  console.log('Starting server...');
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Listening on port ${port}! 🚀`);
  });
};

start().catch(err => {
  console.error(err);
  process.exit(1);
});
