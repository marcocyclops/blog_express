const redis = require('redis')
const { REDIS_CONF } = require('../config/db')

const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)

// node-redis v4 the client does not automatically connect to the server, you need to run .connect() before any command
redisClient.connect().catch(console.error)

module.exports = redisClient