import { Knex } from 'knex';
import { knexSnakeCaseMappers } from 'objection';
import { ApiConfig } from './../app.config';

module.exports = {
  development: {
    client: 'postgresql',
    // TODO: use dot env
    connection: 'psql://admin:admin@localhost:5432/food_rec_db',
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
      directory: './seeds',
      stub: './seed.stub.ts',
    },
    timezone: 'UTC',
    ...knexSnakeCaseMappers(),
  },
} as Knex.Config;
