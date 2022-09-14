import { isNullorUndefined } from './../../utils/object-validation';
import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { ConfigService } from '@nestjs/config';
import { Knex } from 'knex';
import * as knexfile from './../knexfile';

@Injectable()
export class DbConfigService {
  private dbConfigs;

  constructor(private readonly configService: ConfigService) {
    const nodeEnv = this.configService.get('NODE_ENV');
    this.dbConfigs = knexfile[nodeEnv];
    if (isNullorUndefined(this.dbConfigs)) {
      throw new Error(`Cannot find db configs for env: ${nodeEnv}`);
    }
    if (isNullorUndefined(this.dbConfigs.connection)) {
      this.dbConfigs.connection = this.configService.get('DB_URL');
    }
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
