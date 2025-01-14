import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RestaurantEntity } from './entity/restaurant.entity';
import { GenericRepository } from 'src/common/resource';
import { Repository } from 'typeorm';

@Injectable()
export class RestaurantRepository extends GenericRepository<RestaurantEntity> {
  constructor(
    @InjectRepository(RestaurantEntity)
    private readonly restaurantRepository: Repository<RestaurantEntity>,
  ) {
    super(restaurantRepository);
  }
}
