import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { API_VERSION } from 'src/common/constant';
import { MenuItemService } from './menu-item.service';
import { CreateMenuItemDto } from './dto/create-menu-item.dto';
import { ResponseEntity } from 'src/common/entity';
import { UpdateMenuItemDto } from './dto/update-menu-item.dto';
import { SharedMenuGuard } from '../menu/shared/shared-menu.guard';
import { MenuItemGuard } from './guard/menu-item.guard';
import { LanguageDataValidationGuard } from '../menu/shared/language-data-validation.guard';
import { ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@Controller({
  version: API_VERSION,
  path: 'restaurants/:restaurantId/menus/:menuId/menu-items',
})
@UseGuards(SharedMenuGuard, MenuItemGuard)
export class MenuItemController {
  constructor(private readonly menuItemService: MenuItemService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new menu item',
    description: 'Creates a new menu item for the given menu ID.',
  })
  @ApiBody({
    description: 'The data needed to create a new menu item',
    type: CreateMenuItemDto,
  })
  @ApiResponse({
    status: 201,
    description: 'Menu item created successfully.',
  })
  @UseGuards(LanguageDataValidationGuard)
  public async create(
    @Param('menuId') menuId: number,
    @Body() createMenuItemDto: CreateMenuItemDto,
  ) {
    const data = await this.menuItemService.create(menuId, createMenuItemDto);
    return ResponseEntity.created(data);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all menu items for a specific menu',
    description:
      'Retrieves all menu items for the menu identified by the menuId.',
  })
  @ApiParam({
    name: 'menuId',
    description: 'The ID of the menu to get menu items from.',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'List of menu items retrieved successfully.',
  })
  public async findAll(
    @Param('menuId') menuId: number,
    @Req() request: Request,
  ) {
    const data = await this.menuItemService.findAll(
      menuId,
      request.headers['timezone'],
    );
    return ResponseEntity.ok(data);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a menu item by ID',
    description: 'Retrieves a menu item by its ID for the specific menu.',
  })
  @ApiParam({
    name: 'id',
    description: 'The ID of the menu item to retrieve.',
    type: Number,
  })
  @ApiParam({
    name: 'menuId',
    description: 'The ID of the menu that the item belongs to.',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Menu item retrieved successfully.',
  })
  @ApiResponse({
    status: 404,
    description: 'Menu item not found.',
  })
  public async findById(
    @Param('id') id: number,
    @Param('menuId') menuId: number,
    @Req() request: Request,
  ) {
    const data = await this.menuItemService.findByIdOrThrow(
      menuId,
      id,
      request.headers['timezone'],
    );
    return ResponseEntity.ok(data);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a menu item by ID',
    description: 'Deletes a menu item from the menu identified by menuId.',
  })
  @ApiParam({
    name: 'id',
    description: 'The ID of the menu item to delete.',
    type: Number,
  })
  @ApiParam({
    name: 'menuId',
    description: 'The ID of the menu that the item belongs to.',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Menu item deleted successfully.',
  })
  @ApiResponse({
    status: 404,
    description: 'Menu item not found.',
  })
  public async deleteById(
    @Param('id') id: number,
    @Param('menuId') menuId: number,
  ) {
    const data = await this.menuItemService.deleteById(menuId, id);
    return ResponseEntity.ok(data);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update a menu item by ID',
    description: 'Updates a menu item for the specified menu and item ID.',
  })
  @ApiParam({
    name: 'id',
    description: 'The ID of the menu item to update.',
    type: Number,
  })
  @ApiParam({
    name: 'menuId',
    description: 'The ID of the menu that the item belongs to.',
    type: Number,
  })
  @ApiBody({
    description: 'The data needed to update the menu item',
    type: UpdateMenuItemDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Menu item updated successfully.',
  })
  @ApiResponse({
    status: 404,
    description: 'Menu item not found.',
  })
  @UseGuards(LanguageDataValidationGuard)
  public async updateById(
    @Body() updateMenuItemDto: UpdateMenuItemDto,
    @Param('id') id: number,
    @Param('menuId') menuId: number,
  ) {
    const data = await this.menuItemService.updateById(
      menuId,
      id,
      updateMenuItemDto,
    );
    return ResponseEntity.ok(data);
  }
}
