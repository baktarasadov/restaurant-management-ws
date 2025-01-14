import { Injectable } from '@nestjs/common';
import { EntityMapper } from 'src/common/mapper';
import { BranchRepository } from './branch.repository';
import { CreateBranchDto } from './dto/create-branch.dto';
import { BranchEntity } from './entity/branch.entity';
import { BranchDto } from './dto/branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { convertDateToTimeZone } from 'src/common/util';

@Injectable()
export class BranchService {
  constructor(
    private readonly branchRepository: BranchRepository,
    private readonly entityMapper: EntityMapper,
  ) {}

  public async create(restaurantId: number, createBranchDto: CreateBranchDto) {
    const data = await this.branchRepository.save(
      this.entityMapper.toEntity(
        {
          ...createBranchDto,
          restaurant: restaurantId,
        },
        BranchEntity,
      ),
    );

    return this.entityMapper.toDto(data, BranchDto);
  }

  public async findAll(restaurantId: number, timeZone: string) {
    const data = await this.branchRepository.find({
      where: { restaurant: { id: restaurantId } },
    });

    const result = data.map((branch) =>
      convertDateToTimeZone<BranchEntity>(branch, timeZone),
    );

    return this.entityMapper.toDtos(result, BranchDto);
  }

  public async findByIdOrThrow(restaurantId: number, id: number) {
    const data = await this.branchRepository.findOneOrThrow({
      where: { id, restaurant: { id: restaurantId } },
    });

    return this.entityMapper.toDto(
      convertDateToTimeZone<BranchEntity>(data, data.timeZone),
      BranchDto,
    );
  }

  public async updateById(
    restaurantId: number,
    id: number,
    updateBranchDto: UpdateBranchDto,
  ) {
    await this.findByIdOrThrow(restaurantId, id);

    const data = await this.branchRepository.updateById(
      id,
      this.entityMapper.toEntity(updateBranchDto, BranchDto),
    );

    return this.entityMapper.toDto(data, BranchDto);
  }

  public async deleteById(restaurantId: number, id: number) {
    await this.findByIdOrThrow(restaurantId, id);

    await this.branchRepository.deleteById(id);
  }
}
