import { LanguageEntity } from 'src/modules/language';
import { Entity, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { SharedRestaurantEntity } from '../shared';
import { BranchEntity } from '../../branch';

@Entity('restaurants')
export class RestaurantEntity extends SharedRestaurantEntity {
  @ManyToMany(() => LanguageEntity)
  @JoinTable({
    name: 'restaurant_languages',
    joinColumn: { name: 'restaurant_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'language_id', referencedColumnName: 'id' },
  })
  supportedLanguages: LanguageEntity[];

  @OneToMany('BranchEntity', (branch: BranchEntity) => branch.restaurant, {
    cascade: true,
  })
  branches: BranchEntity[];
}
