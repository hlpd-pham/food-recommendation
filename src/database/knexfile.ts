import { Knex } from 'knex';
import { knexSnakeCaseMappers } from 'objection';

module.exports = {
  development: {
    client: 'postgresql',
    connection: process.env.DB_URL,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: './migrations',
      stub: './migration.stub',
      extension: 'ts',
      tableName: 'knex_migrations',
    },
    seeds: {
      directory: './seeds/local',
      stub: './seed.stub',
    },
    timezone: 'UTC',
    ...knexSnakeCaseMappers(),
  },
} as Knex.Config;
