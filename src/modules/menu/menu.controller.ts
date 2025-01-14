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
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { ResponseEntity } from 'src/common/entity';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { SharedMenuGuard } from './shared/shared-menu.guard';
import { LanguageDataValidationGuard } from './shared/language-data-validation.guard';
import {
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Menus')
@Controller({
  version: API_VERSION,
  path: 'menus',
})
@UseGuards(SharedMenuGuard)
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post('restaurants/:restaurantId')
  @UseGuards(LanguageDataValidationGuard)
  @ApiOperation({ summary: 'Create a menu for a restaurant' })
  @ApiParam({
    name: 'restaurantId',
    description: 'The ID of the restaurant',
    type: Number,
  })
  @ApiBody({ type: CreateMenuDto })
  @ApiResponse({ status: 201, description: 'Menu created successfully' })
  public async createByRestaurant(
    @Param('restaurantId') restaurantId: number,
    @Body() createMenuDto: CreateMenuDto,
  ) {
    const data = await this.menuService.create(restaurantId, createMenuDto);
    return ResponseEntity.created(data);
  }

  @Post('restaurants/:restaurantId/branches/:branchId')
  @UseGuards(LanguageDataValidationGuard)
  @ApiOperation({ summary: 'Create a menu for a branch' })
  @ApiParam({
    name: 'branchId',
    description: 'The ID of the branch',
    type: Number,
  })
  @ApiBody({ type: CreateMenuDto })
  @ApiResponse({ status: 201, description: 'Menu created successfully' })
  public async createByBranch(
    @Param('branchId') branchId: number,
    @Body() createMenuDto: CreateMenuDto,
  ) {
    const data = await this.menuService.create(null, createMenuDto, branchId);
    return ResponseEntity.created(data);
  }

  @Get('restaurants/:restaurantId')
  @ApiOperation({ summary: 'Get all menus for a restaurant' })
  @ApiParam({
    name: 'restaurantId',
    description: 'The ID of the restaurant',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'List of menus for the restaurant',
  })
  public async findAllByRestaurant(
    @Param('restaurantId') restaurantId: number,
    @Req() request: Request,
  ) {
    const data = await this.menuService.findAll(
      restaurantId,
      request.headers['timezone'],
    );
    return ResponseEntity.ok(data);
  }

  @Get('branches/:branchId')
  @ApiOperation({ summary: 'Get all menus for a branch' })
  @ApiParam({
    name: 'branchId',
    description: 'The ID of the branch',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'List of menus for the branch',
  })
  public async findAllByBranchId(
    @Param('branchId') branchId: number,
    @Req() request: Request,
  ) {
    const data = await this.menuService.findAll(
      null,
      request.headers['timezone'],
      branchId,
    );
    return ResponseEntity.ok(data);
  }

  @Get('restaurants/:restaurantId/:id')
  @ApiOperation({ summary: 'Get a menu by ID for a restaurant' })
  @ApiParam({
    name: 'restaurantId',
    description: 'The ID of the restaurant',
    type: Number,
  })
  @ApiParam({
    name: 'id',
    description: 'The ID of the menu',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'The menu details',
  })
  public async findOneByRestaurant(
    @Param('id') id: number,
    @Param('restaurantId') restaurantId: number,
    @Req() request: Request,
  ) {
    const data = await this.menuService.findByIdOrThrow(
      restaurantId,
      id,
      request.headers['timezone'],
    );
    return ResponseEntity.ok(data);
  }

  @Get('branches/:branchId/:id')
  @ApiOperation({ summary: 'Get a menu by ID for a branch' })
  @ApiParam({
    name: 'branchId',
    description: 'The ID of the branch',
    type: Number,
  })
  @ApiParam({
    name: 'id',
    description: 'The ID of the menu',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'The menu details',
  })
  public async findOneByBranch(
    @Param('id') id: number,
    @Param('branchId') branchId: number,
    @Req() request: Request,
  ) {
    const data = await this.menuService.findByIdOrThrow(
      null,
      id,
      request.headers['timezone'],
      branchId,
    );
    return ResponseEntity.ok(data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a menu by ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the menu',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Menu deleted successfully',
  })
  public async deleteByBranch(@Param('id') id: number) {
    const data = await this.menuService.deleteById(id);
    return ResponseEntity.ok(data);
  }

  @Patch(':id/restaurants/:restaurantId/branches/:branchId')
  @UseGuards(LanguageDataValidationGuard)
  @ApiOperation({ summary: 'Update a menu for a branch' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the menu',
    type: Number,
  })
  @ApiParam({
    name: 'branchId',
    description: 'The ID of the branch',
    type: Number,
  })
  @ApiBody({ type: UpdateMenuDto })
  @ApiResponse({
    status: 200,
    description: 'Menu updated successfully',
  })
  public async updateByBranch(
    @Body() updateMenuDto: UpdateMenuDto,
    @Param('id') id: number,
    @Param('branchId') branchId: number,
  ) {
    const data = await this.menuService.updateById(
      id,
      updateMenuDto,
      null,
      branchId,
    );
    return ResponseEntity.ok(data);
  }

  @Patch(':id/restaurants/:restaurantId')
  @UseGuards(LanguageDataValidationGuard)
  @ApiOperation({ summary: 'Update a menu for a restaurant' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the menu',
    type: Number,
  })
  @ApiParam({
    name: 'restaurantId',
    description: 'The ID of the restaurant',
    type: Number,
  })
  @ApiBody({ type: UpdateMenuDto })
  @ApiResponse({
    status: 200,
    description: 'Menu updated successfully',
  })
  public async updateByRestaurant(
    @Body() updateMenuDto: UpdateMenuDto,
    @Param('id') id: number,
    @Param('restaurantId') restaurantId: number,
  ) {
    const data = await this.menuService.updateById(
      id,
      updateMenuDto,
      restaurantId,
    );
    return ResponseEntity.ok(data);
  }
}
