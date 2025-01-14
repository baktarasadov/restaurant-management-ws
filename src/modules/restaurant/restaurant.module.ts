import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantEntity } from './entity/restaurant.entity';
import { RestaurantController } from './restaurant.controller';
import { RestaurantService } from './restaurant.service';
import { RestaurantRepository } from './restaurant.repository';
import { EntityMapper } from 'src/common/mapper';
import { LanguageModule } from '../language';

const imports = [TypeOrmModule.forFeature([RestaurantEntity]), LanguageModule];

const services = [RestaurantService];

const controllers = [RestaurantController];

const repositories = [RestaurantRepository];

const providers = [...services, ...repositories, EntityMapper];

const exportedServices = [RestaurantService];

@Module({
  imports,
  controllers,
  providers,
  exports: exportedServices,
})
export class RestaurantModule {}
