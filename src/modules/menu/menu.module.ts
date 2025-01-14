import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityMapper } from 'src/common/mapper';
import { LanguageModule } from '../language';
import { MenuEntity } from './entity/menu.entity';
import { MenuController } from './menu.controller';
import { MenuService } from './menu.service';
import { MenuRepository } from './menu.repository';
import { RestaurantModule } from '../restaurant';
import { TranslationRepository } from './shared/translation/translation.repository';
import { TranslationEntity } from './shared/translation/translation.entity';

const exportedServices = [MenuService, MenuRepository];

const controllers = [MenuController];

const services = [MenuService];

const repositories = [MenuRepository, TranslationRepository];

const providers = [...services, ...repositories, EntityMapper];

const imports = [
  TypeOrmModule.forFeature([MenuEntity, TranslationEntity]),
  LanguageModule,
  RestaurantModule,
];

@Module({
  imports,
  controllers,
  providers,
  exports: exportedServices,
})
export class MenuModule {}
