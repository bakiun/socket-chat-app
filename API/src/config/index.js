const ip = require("ip");

module.exports = {
  port: process.env.PORT || 3001,
  ip: ip.address(),
  mongoDBUrl: `mongodb://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASS}@${process.env.MONGO_DB_URL}/${process.env.MONGO_DB_NAME}`,
};
