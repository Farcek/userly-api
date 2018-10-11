const config = require("config");

const sqConf = {
  "username": config.database.username,
  "password": config.database.password,
  "database": config.database.database,
  "host": config.database.host,
  "port": config.database.port,
  "dialect": config.database.dialect,
};

console.log("loaded config", sqConf)

module.exports = {
  "development": sqConf,
  "staging": sqConf,
  "production": sqConf
};