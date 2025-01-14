import { Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { SharedMenuDto } from '../shared';
import { MenuItemDto } from '../../menu-item';

export class MenuDto extends SharedMenuDto {
  @ApiProperty({
    description: 'List of menu items in the menu',
    type: [MenuItemDto],
  })
  @Expose()
  @Type(() => MenuItemDto)
  menuItems: MenuItemDto[];

  @ApiProperty({
    description: 'Indicates if this is the main menu',
    type: Boolean,
  })
  @Expose()
  isMainMenu: boolean;
}
