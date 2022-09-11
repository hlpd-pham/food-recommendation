import { ApiConfig } from './../app.config';
import { Knex } from 'knex';
import { knexSnakeCaseMappers } from 'objection';

module.exports = {
  development: {
    client: 'postgresql',
    connection: ApiConfig.DB_URL,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: './migrations',
      stub: './migration.stub.ts',
      extension: 'ts',
      tableName: 'knex_migrations',
    },
    seeds: {
      directory: './seeds/local',
      stub: './seed.stub.ts',
    },
    timezone: 'UTC',
    ...knexSnakeCaseMappers(),
  },
} as Knex.Config;
