import knex from 'knex';

const env = process.env.NODE_ENV || 'development';
import knexfile from '../knexfile.js';

export default knex(knexfile[env]);
