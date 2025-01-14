import { BaseEntity } from 'src/common/entity';
import { Entity, Column } from 'typeorm';

@Entity('languages')
export class LanguageEntity extends BaseEntity {
  @Column({ unique: true })
  code: string;

  @Column({ unique: true })
  name: string;
}
