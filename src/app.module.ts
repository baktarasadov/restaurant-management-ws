import './config/env.config';
import { Module } from '@nestjs/common';
import { DatabaseModule } from './database';
import {
  BranchModule,
  LanguageModule,
  MenuItemModule,
  MenuModule,
  RestaurantModule,
} from './modules';
@Module({
  imports: [
    DatabaseModule,
    LanguageModule,
    RestaurantModule,
    BranchModule,
    MenuModule,
    MenuItemModule,
  ],
})
export class AppModule {}
