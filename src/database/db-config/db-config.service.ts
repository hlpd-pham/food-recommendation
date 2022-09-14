import { isNullorUndefined } from './../../utils/object-validation';
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
    const nodeEnv = this.configService.get('NODE_ENV');
    this.dbConfigs = this.configTemplate[nodeEnv];
    if (isNullorUndefined(this.dbConfigs)) {
      throw new Error(`Cannot find db configs for env: ${nodeEnv}`);
    }
    this.dbConfigs.connection = this.configService.get('DB_URL');
  }

  public getDbConfigs = (): Knex.Config => {
    if (
      this.dbConfigs?.connection === null ||
      this.dbConfigs?.connection === undefined
    ) {
      throw new Error('DB URL cannot be empty');
    }
    return this.dbConfigs;
  };
}
