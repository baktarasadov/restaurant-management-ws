import { Injectable, NotFoundException } from '@nestjs/common';
import { LanguageRepository } from './language.repository';
import { EntityMapper } from 'src/common/mapper';
import { CreateLanguageDto } from './dto/create-language.dto';
import { LanguageEntity } from './entity/language.entity';
import { LanguageDto } from './dto/language.dto';
import { UniqueConstraintException } from 'src/common/exception';
import { In } from 'typeorm';

@Injectable()
export class LanguageService {
  constructor(
    private readonly languageRepository: LanguageRepository,
    private readonly entityMapper: EntityMapper,
  ) {}

  public async create(createLanguageDto: CreateLanguageDto) {
    await this.checkUnique(createLanguageDto.code);

    const data = await this.languageRepository.save(
      this.entityMapper.toEntity(createLanguageDto, LanguageEntity),
    );

    return this.entityMapper.toDto(data, LanguageDto);
  }

  public async findAll() {
    const data = await this.languageRepository.findAll();

    return this.entityMapper.toDtos(data, LanguageDto);
  }

  public async findByIdsOrThrow(ids: number[]) {
    const data = await this.languageRepository.find({
      where: { id: In(ids) },
    });

    const foundIds = data.map((item) => item.id);

    const missingIds = ids.filter((id) => !foundIds.includes(id));

    if (missingIds.length > 0) {
      throw new NotFoundException(
        `Languages with IDs ${missingIds.join(', ')} not found.`,
      );
    }
    return data;
  }

  public async findByCodeOrThrow(code: string) {
    const data = await this.languageRepository.findOne({ where: { code } });
    if (!data) {
      throw new NotFoundException(`Resource not found`);
    }
    return data;
  }

  private async checkUnique(code: string) {
    const data = await this.languageRepository.findOne({ where: { code } });

    if (data) {
      throw new UniqueConstraintException(code);
    }
  }
}
