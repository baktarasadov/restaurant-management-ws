import { RestaurantEntity } from 'src/modules/restaurant';
import { BranchEntity } from 'src/modules/branch';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { MenuItemEntity } from '../../menu-item/entity/menu-item.entity';
import { TranslationEntity } from '../shared/translation/translation.entity';
import { BaseEntity } from 'src/common/entity';

@Entity('menus')
export class MenuEntity extends BaseEntity {
  @ManyToOne(() => RestaurantEntity, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'restaurant_id' })
  restaurant: RestaurantEntity | null;

  @ManyToOne(() => BranchEntity, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'branch_id' })
  branch: BranchEntity | null;

  @Column({ name: 'is_main_menu' })
  isMainMenu: boolean;

  @OneToMany(() => MenuItemEntity, (menu: MenuItemEntity) => menu.menu, {
    cascade: true,
  })
  menuItems: MenuItemEntity[];

  @OneToMany(
    () => TranslationEntity,
    (translation: TranslationEntity) => translation.menu,
  )
  content: TranslationEntity[];
}
