import 'dotenv/config';

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
export default {
  development: {
    client: 'mariadb',
    connection: {
      host: '127.0.0.1',
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
    }
  },

  production: {
    client: 'mariadb',
    connection: {
      host: '127.0.0.1',
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
};
