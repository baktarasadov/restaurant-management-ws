import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GenericRepository } from 'src/common/resource';
import { Repository } from 'typeorm';
import { MenuEntity } from './entity/menu.entity';

@Injectable()
export class MenuRepository extends GenericRepository<MenuEntity> {
  constructor(
    @InjectRepository(MenuEntity)
    private readonly menuRepository: Repository<MenuEntity>,
  ) {
    super(menuRepository);
  }
}
