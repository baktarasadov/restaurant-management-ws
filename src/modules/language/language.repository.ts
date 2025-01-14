import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LanguageEntity } from './entity/language.entity';
import { GenericRepository } from 'src/common/resource';
import { Repository } from 'typeorm';

@Injectable()
export class LanguageRepository extends GenericRepository<LanguageEntity> {
  constructor(
    @InjectRepository(LanguageEntity)
    private readonly languageRepository: Repository<LanguageEntity>,
  ) {
    super(languageRepository);
  }
}
