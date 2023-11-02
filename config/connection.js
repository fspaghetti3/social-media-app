//config connection.js
require('dotenv').config();
const { Sequelize } = require('sequelize');
const url = require('url');

let dbUrl = process.env.JAWSDB_URL;
if (!dbUrl) {
  dbUrl = 'mysql://rfl7tm97s8ylvvv8:gn5x4vwfzdbx2w8h@ckshdphy86qnz0bj.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/tqd0vzz8uylev2mu';
}

const params = url.parse(dbUrl);
const auth = params.auth.split(':');

const sequelize = new Sequelize(params.pathname.split('/')[1], auth[0], auth[1], {
  host: params.hostname,
  port: params.port,
  dialect: 'mysql',
  
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },

  logging: true
});

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(error => {
    console.error('Unable to connect to the database:', error);
  });

module.exports = sequelize;