const ip = require("ip");

module.exports = {
  port: process.env.PORT || 3001,
  ip: ip.address(),
  mongoDBUrl: process.env.MONGO_DB_URL,
};
