import knex from 'knex';

const env = process.env.NODE_ENV || 'development';
const knexfile = require('../knexfile');

export default knex(knexfile[env]);
