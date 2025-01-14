import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GenericRepository } from 'src/common/resource';
import { Repository } from 'typeorm';
import { BranchEntity } from './entity/branch.entity';

@Injectable()
export class BranchRepository extends GenericRepository<BranchEntity> {
  constructor(
    @InjectRepository(BranchEntity)
    private readonly branchRepository: Repository<BranchEntity>,
  ) {
    super(branchRepository);
  }
}
