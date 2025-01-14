import { BaseEntity } from 'src/common/entity';
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { MenuEntity } from '../../entity/menu.entity';
import { MenuItemEntity } from '../../../menu-item/entity/menu-item.entity';

@Entity('translations')
export class TranslationEntity extends BaseEntity {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ name: 'language_code' })
  languageCode: string;

  @ManyToOne(() => MenuEntity, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'menu_id' })
  menu: MenuEntity;

  @ManyToOne(() => MenuItemEntity, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'menu_item_id' })
  menuItem: MenuItemEntity;
}
