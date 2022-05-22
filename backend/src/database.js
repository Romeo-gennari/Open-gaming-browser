const knex = require('knex');

const env = process.env.NODE_ENV || 'development';
const knexfile = require('../knexfile.js');

module.exports = knex(knexfile[env]);
