import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GenericRepository } from 'src/common/resource';
import { Repository } from 'typeorm';
import { TranslationEntity } from './translation.entity';

@Injectable()
export class TranslationRepository extends GenericRepository<TranslationEntity> {
  constructor(
    @InjectRepository(TranslationEntity)
    private readonly translationRepository: Repository<TranslationEntity>,
  ) {
    super(translationRepository);
  }

  public async saveMany(entity: TranslationEntity[]) {
    return this.translationRepository.save(entity);
  }

  public async updateTranslationsByMenuId(menuId: number, translations: any[]) {
    const updatePromises = translations.map(async (translation) => {
      return this.translationRepository
        .createQueryBuilder()
        .update(TranslationEntity)
        .set({
          name: translation.name,
          description: translation.description,
        })
        .where('menu_id = :menuId', { menuId })
        .andWhere('languageCode = :languageCode', {
          languageCode: translation.languageCode,
        })
        .execute();
    });

    await Promise.all(updatePromises);
  }

  public async updateTranslationsByMenuItemId(
    menuItemId: number,
    translations: any[],
  ) {
    const updatePromises = translations.map(async (translation) => {
      return this.translationRepository
        .createQueryBuilder()
        .update(TranslationEntity)
        .set({
          name: translation.name,
          description: translation.description,
        })
        .where('menu_item_id  = :menuItemId', { menuItemId })
        .andWhere('languageCode = :languageCode', {
          languageCode: translation.languageCode,
        })
        .execute();
    });

    await Promise.all(updatePromises);
  }
}
