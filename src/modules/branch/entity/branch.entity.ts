import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { RestaurantEntity } from '../../restaurant/entity/restaurant.entity';
import { SharedRestaurantEntity } from '../../restaurant/shared';

@Entity('branches')
export class BranchEntity extends SharedRestaurantEntity {
  @ManyToOne('RestaurantEntity', {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'restaurant_id' })
  restaurant: RestaurantEntity;

  @Column()
  location: string;
}
