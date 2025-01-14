import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GenericRepository } from 'src/common/resource';
import { Repository } from 'typeorm';
import { MenuItemEntity } from './entity/menu-item.entity';

@Injectable()
export class MenuItemRepository extends GenericRepository<MenuItemEntity> {
  constructor(
    @InjectRepository(MenuItemEntity)
    private readonly menuItemRepository: Repository<MenuItemEntity>,
  ) {
    super(menuItemRepository);
  }
}
