import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityMapper } from 'src/common/mapper';
import { MenuItemEntity } from './entity/menu-item.entity';
import { MenuItemController } from './menu-item.controller';
import { MenuItemService } from './menu-item.service';
import { MenuItemRepository } from './menu-item.repository';
import { MenuModule } from '../menu/menu.module';
import { RestaurantModule } from 'src/modules/restaurant';
import { TranslationRepository } from '../menu/shared/';
import { TranslationEntity } from '../menu/shared/';

const controllers = [MenuItemController];

const repositories = [MenuItemRepository, TranslationRepository];

const services = [MenuItemService];

const imports = [
  TypeOrmModule.forFeature([MenuItemEntity, TranslationEntity]),
  RestaurantModule,
  MenuModule,
];

const providers = [...repositories, ...services, EntityMapper];

@Module({
  imports,
  controllers,
  providers,
})
export class MenuItemModule {}
