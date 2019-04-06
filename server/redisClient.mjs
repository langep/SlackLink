
import redis from 'redis';
const redisUrl = process.env.REDIS_URL;
const redisClient = redis.createClient(redisUrl);

const getToken = userId => {
  return new Promise(function (resolve, reject) {
    redisClient.get(userId, function (err, reply) {
      if (err) {
        reject(err);
      } else {
        if (reply) {
          resolve(reply.toString());
        } else {
          reject(new Error('Token not found.'));
        }
      }
    });
  });
};

const setToken = (userId, token) => {
  redisClient.set(userId, token);
};

export { getToken, setToken };
