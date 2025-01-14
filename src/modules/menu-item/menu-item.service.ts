import { Injectable } from '@nestjs/common';
import { EntityMapper } from 'src/common/mapper';
import { CreateMenuItemDto } from './dto/create-menu-item.dto';
import { MenuItemDto } from './dto/menu-item.dto';
import { MenuItemRepository } from './menu-item.repository';
import { MenuItemEntity } from './entity/menu-item.entity';
import { UpdateMenuItemDto } from './dto/update-menu-item.dto';
import { convertDateToTimeZone } from 'src/common/util';
import { TranslationEntity } from '../menu/shared';
import { TranslationRepository } from '../menu/shared';

@Injectable()
export class MenuItemService {
  constructor(
    private readonly menuItemRepository: MenuItemRepository,
    private readonly translationRepository: TranslationRepository,
    private readonly entityMapper: EntityMapper,
  ) {}

  public async create(menuId: number, createMenuItemDto: CreateMenuItemDto) {
    const data = await this.menuItemRepository.save(
      this.entityMapper.toEntity(
        {
          ...createMenuItemDto,
          menu: menuId,
        },
        MenuItemEntity,
      ),
    );

    const translation = createMenuItemDto.content.map((item) =>
      this.entityMapper.toEntity(
        {
          ...item,
          menuItem: data,
        },
        TranslationEntity,
      ),
    );

    await this.translationRepository.saveMany(translation);

    return this.entityMapper.toDto(data, MenuItemDto);
  }

  public async findByIdOrThrow(menuId: number, id: number, timeZone?: string) {
    const data = await this.menuItemRepository.findOneOrThrow({
      where: { id, menu: { id: menuId } },
      relations: ['content'],
    });

    if (timeZone) {
      return convertDateToTimeZone<MenuItemEntity>(data, timeZone);
    }

    return this.entityMapper.toDto(data, MenuItemDto);
  }

  public async deleteById(menuId: number, id: number) {
    await this.findByIdOrThrow(menuId, id);
    await this.menuItemRepository.deleteById(id);
  }

  public async findAll(menuId: number, timeZone: string) {
    const data = await this.menuItemRepository.find({
      relations: ['menu', 'content'],
      where: { menu: { id: menuId } },
    });

    const result = data.map((menuItem) =>
      convertDateToTimeZone<MenuItemEntity>(menuItem, timeZone),
    );

    return this.entityMapper.toDtos(result, MenuItemDto);
  }

  public async updateById(
    menuId: number,
    id: number,
    updateMenuItemDto: UpdateMenuItemDto,
  ) {
    await this.findByIdOrThrow(menuId, id);

    await this.translationRepository.updateTranslationsByMenuItemId(
      id,
      updateMenuItemDto.content,
    );
    const data = await this.findByIdOrThrow(menuId, id);
    return this.entityMapper.toDto(data, MenuItemDto);
  }
}
