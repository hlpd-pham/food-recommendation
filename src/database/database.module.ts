import { Module } from '@nestjs/common';
import { ObjectionModule } from '@willsoto/nestjs-objection';
import { DbConfigModule } from './db-config/db-config.module';
import { DbConfigService } from './db-config/db-config.service';

@Module({
  imports: [
    ObjectionModule.registerAsync({
      imports: [DbConfigModule],
      inject: [DbConfigService],
      useFactory: async (dbConfigService: DbConfigService) => ({
        config: dbConfigService.getDbConfigs(),
      }),
    }),
  ],
})
export class DatabaseModule {}
