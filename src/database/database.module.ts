import { Module } from '@nestjs/common';

import { databaseProviders } from './database.providers';

@Module({
  exports: [...databaseProviders],
  imports: [...databaseProviders],
})
export class DatabaseModule {}
