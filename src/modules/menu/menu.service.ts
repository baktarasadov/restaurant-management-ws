import { HttpException, Injectable } from '@nestjs/common';
import { EntityMapper } from 'src/common/mapper';
import { CreateMenuDto } from './dto/create-menu.dto';
import { MenuDto } from './dto/menu.dto';
import { MenuRepository } from './menu.repository';
import { MenuEntity } from './entity/menu.entity';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { convertDateToTimeZone } from 'src/common/util';
import { MenuItemEntity } from '../menu-item/entity/menu-item.entity';
import { TranslationEntity } from './shared/translation/translation.entity';
import { TranslationRepository } from './shared/translation/translation.repository';

@Injectable()
export class MenuService {
  constructor(
    private readonly menuRepository: MenuRepository,
    private readonly translationRepository: TranslationRepository,
    private readonly entityMapper: EntityMapper,
  ) { }

  public async create(
    restaurantId: number | null,
    createMenuDto: CreateMenuDto,
    branch: number | null = null,
  ) {
    const data = await this.menuRepository.save(
      this.entityMapper.toEntity(
        {
          ...createMenuDto,
          restaurant: restaurantId,
          branch,
          isMainMenu: branch ? false : true,
        },
        MenuEntity,
      ),
    );

    const translation = createMenuDto.content.map((item) =>
      this.entityMapper.toEntity(
        {
          ...item,
          menu: data,
        },
        TranslationEntity,
      ),
    );

    await this.translationRepository.saveMany(translation);

    return data;
  }

  public async findByIdOrThrow(
    restaurantId: number | null,
    id: number,
    timeZone?: string,
    branchId?: number,
  ) {
    const data = await this.menuRepository.findOneOrThrow({
      relations: ['menuItems', 'menuItems.content', 'content'],
      where: branchId
        ? [
          { branch: { id: branchId }, id },
          { restaurant: { id: restaurantId }, id },
        ]
        : { restaurant: { id: restaurantId }, id },
    });

    if (timeZone) {
      const convertMenu = convertDateToTimeZone<MenuEntity>(data, timeZone);

      const menuItems = data.menuItems.map((item) =>
        convertDateToTimeZone<MenuItemEntity>(item, timeZone),
      );

      return this.entityMapper.toDto({ ...convertMenu, ...menuItems }, MenuDto);
    }

    return this.entityMapper.toDto(data, MenuDto);
  }

  public async deleteById(id: number) {
    await this.menuRepository.findByIdOrThrow(id);
    await this.menuRepository.deleteById(id);
  }

  public async findAll(
    restaurantId: number | null,
    timeZone: string,
    branchId?: number,
  ) {
    const data = await this.menuRepository.find({
      relations: ['menuItems', 'menuItems.content', 'content'],
      where: branchId
        ? [{ branch: { id: branchId } }, { restaurant: { id: restaurantId } }]
        : { restaurant: { id: restaurantId } },
    });

    const result = data.map((menu) => {
      const convertMenu = convertDateToTimeZone<MenuEntity>(menu, timeZone);

      const menuItems = menu.menuItems.map((item) =>
        convertDateToTimeZone<MenuItemEntity>(item, timeZone),
      );
      return {
        ...convertMenu,
        ...menuItems,
      };
    });

    return this.entityMapper.toDtos(result, MenuDto);
  }

  public async updateById(
    id: number,
    updateMenuDto: UpdateMenuDto,
    restaurantId: number | null,
    branchId?: number,
  ) {
    const data = await this.menuRepository.findOneOrThrow({
      where: restaurantId
        ? { id, restaurant: { id: restaurantId } }
        : { id, branch: { id: branchId } },
    });

    if (branchId) {
      if (data.isMainMenu) {
        throw new HttpException(
          'This menu is marked as a main menu and cannot be modified or deleted.',
          400,
        );
      }
    }

    await this.translationRepository.updateTranslationsByMenuId(
      id,
      updateMenuDto.content,
    );

    return this.menuRepository.findByIdOrThrow(id);
  }
}
