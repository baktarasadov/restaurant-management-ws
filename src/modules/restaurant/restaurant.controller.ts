import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { CreateRestaurantDto } from './dto/request/create-restaurant.dto';
import { ResponseEntity } from 'src/common/entity';
import { API_VERSION } from 'src/common/constant';
import { UpdateRestaurantDto } from './dto/request/update-restaurant.dto';
import { ApiOperation, ApiResponse, ApiTags, ApiParam } from '@nestjs/swagger';
import { RestaurantDto } from './dto/restaurant.dto';

@ApiTags('Restaurants')
@Controller({
  version: API_VERSION,
  path: 'restaurants',
})
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new restaurant' })
  @ApiResponse({
    status: 201,
    description: 'The restaurant has been successfully created.',
    type: RestaurantDto,
  })
  public async create(@Body() createRestaurantDto: CreateRestaurantDto) {
    const data = await this.restaurantService.create(createRestaurantDto);
    return ResponseEntity.created(data);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all restaurants' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved all restaurants.',
    type: [RestaurantDto],
  })
  public async findAll() {
    const data = await this.restaurantService.findAll();
    return ResponseEntity.ok(data);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a restaurant by ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the restaurant to retrieve',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved the restaurant.',
    type: RestaurantDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Resource not found.',
  })
  public async findById(@Param('id') id: number) {
    const data = await this.restaurantService.findByIdOrThrow(id);
    return ResponseEntity.ok(data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a restaurant by ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the restaurant to delete',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully deleted the restaurant.',
  })
  @ApiResponse({
    status: 404,
    description: 'Restaurant not found.',
  })
  public async deleteById(@Param('id') id: number) {
    const data = await this.restaurantService.deleteById(id);
    return ResponseEntity.ok(data);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a restaurant by ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the restaurant to update',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully updated the restaurant.',
    type: RestaurantDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Restaurant not found.',
  })
  public async updateById(
    @Body() updateRestaurantDto: UpdateRestaurantDto,
    @Param('id') id: number,
  ) {
    const data = await this.restaurantService.updateById(
      id,
      updateRestaurantDto,
    );
    return ResponseEntity.ok(data);
  }
}
