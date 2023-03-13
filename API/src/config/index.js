const ip = require("ip");

module.exports = {
  port: process.env.PORT || 3001,
  ip: ip.address(),
  MONGO_DB_URL: process.env.MONGO_DB_URL
};
