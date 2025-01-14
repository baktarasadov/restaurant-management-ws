import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LanguageEntity } from './entity/language.entity';
import { LanguageController } from './language.controller';
import { LanguageService } from './language.service';
import { LanguageRepository } from './language.repository';
import { EntityMapper } from 'src/common/mapper';

@Module({
  imports: [TypeOrmModule.forFeature([LanguageEntity])],
  controllers: [LanguageController],
  providers: [LanguageService, LanguageRepository, EntityMapper],
  exports: [LanguageService],
})
export class LanguageModule {}
