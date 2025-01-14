import { Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { TranslationEntity } from '../../menu/shared';
import { MenuEntity } from '../../menu/entity/menu.entity';
import { BaseEntity } from 'src/common/entity';

@Entity('menu_items')
export class MenuItemEntity extends BaseEntity {
  @ManyToOne(() => MenuEntity, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'menu_id' })
  menu: MenuEntity;

  @OneToMany(
    () => TranslationEntity,
    (translation: TranslationEntity) => translation.menuItem,
  )
  content: TranslationEntity[];
}
