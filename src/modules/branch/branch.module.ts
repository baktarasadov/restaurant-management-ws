import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BranchEntity } from './entity/branch.entity';
import { BranchController } from './branch.controller';
import { BranchService } from './branch.service';
import { BranchRepository } from './branch.repository';
import { EntityMapper } from 'src/common/mapper';
import { RestaurantModule } from '../restaurant/restaurant.module';

const imports = [TypeOrmModule.forFeature([BranchEntity]), RestaurantModule];

const services = [BranchService];

const repositories = [BranchRepository];

const controllers = [BranchController];

const providers = [...services, ...repositories, EntityMapper];

@Module({
  imports,
  controllers,
  providers,
})
export class BranchModule {}
