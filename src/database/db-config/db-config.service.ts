import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { ConfigService } from '@nestjs/config';
import { Knex } from 'knex';
import { knexSnakeCaseMappers } from 'objection';

@Injectable()
export class DbConfigService {
  private configTemplate = {
    development: {
      client: 'postgresql',
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
  };
  private dbConfigs;

  constructor(private readonly configService: ConfigService) {
    this.dbConfigs = this.configTemplate[this.configService.get('NODE_ENV')];
    this.dbConfigs.connection = this.configService.get('DB_URL');
  }

  public getDbConfigs = (): Knex.Config => this.dbConfigs;
}
