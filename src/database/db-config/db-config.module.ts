import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DbConfigService } from './db-config.service';

@Module({
  imports: [],
  providers: [DbConfigService, ConfigService],
  exports: [DbConfigService],
})
export class DbConfigModule {}
