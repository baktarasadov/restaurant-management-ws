import { BaseEntity } from 'src/common/entity';
import { Column } from 'typeorm';

export abstract class SharedRestaurantEntity extends BaseEntity {
  @Column()
  name: string;

  @Column({ name: 'time_zone' })
  timeZone: string;
}
