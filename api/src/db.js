var Sequelize = require('sequelize');
const S = Sequelize;
const {DB_PASSWORD, DB_HOST, DB_USER} = process.env;

var db = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/chatdb`, {
  logging: false,
});

module.exports = {db}
