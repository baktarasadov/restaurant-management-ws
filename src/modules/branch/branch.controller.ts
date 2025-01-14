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
import { ResponseEntity } from 'src/common/entity';
import { API_VERSION } from 'src/common/constant';
import { BranchService } from './branch.service';
import { CreateBranchDto } from './dto/create-branch.dto';
import { BranchGuard } from './guard/branch.guard';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { ApiOperation, ApiResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { BranchDto } from './dto/branch.dto'; // Assuming BranchDto exists
@ApiTags('Branches')
@Controller({
  version: API_VERSION,
  path: 'restaurants/:restaurantId/branches',
})
@UseGuards(BranchGuard)
export class BranchController {
  constructor(private readonly branchService: BranchService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new branch for a specific restaurant' })
  @ApiResponse({
    status: 201,
    description: 'Branch successfully created',
    type: BranchDto,
  })
  public async create(
    @Param('restaurantId') restaurantId: number,
    @Body() createBranchDto: CreateBranchDto,
  ) {
    const data = await this.branchService.create(restaurantId, createBranchDto);
    return ResponseEntity.created(data);
  }

  @Get()
  @ApiOperation({ summary: 'Get all branches of a specific restaurant' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved all branches',
    type: [BranchDto],
  })
  public async findAll(
    @Param('restaurantId') restaurantId: number,
    @Req() request: Request,
  ) {
    const data = await this.branchService.findAll(
      restaurantId,
      request.headers['timezone'],
    );
    return ResponseEntity.ok(data);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific branch by its ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the branch to retrieve',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved the branch',
    type: BranchDto,
  })
  public async findById(
    @Param('restaurantId') restaurantId: number,
    @Param('id') id: number,
  ) {
    const data = await this.branchService.findByIdOrThrow(restaurantId, id);
    return ResponseEntity.ok(data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a branch by its ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the branch to delete',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully deleted the branch',
  })
  public async deleteById(
    @Param('restaurantId') restaurantId: number,
    @Param('id') id: number,
  ) {
    const data = await this.branchService.deleteById(restaurantId, id);
    return ResponseEntity.ok(data);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a branch by its ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the branch to update',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully updated the branch',
    type: UpdateBranchDto,
  })
  public async updateById(
    @Param('restaurantId') restaurantId: number,
    @Param('id') id: number,
    @Body() updateBranchDto: UpdateBranchDto,
  ) {
    const data = await this.branchService.updateById(
      restaurantId,
      id,
      updateBranchDto,
    );
    return ResponseEntity.ok(data);
  }
}
