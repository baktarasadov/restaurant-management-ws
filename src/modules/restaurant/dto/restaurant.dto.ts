import { Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { SharedRestaurantDto } from '../shared';
import { LanguageDto } from 'src/modules/language';

export class RestaurantDto extends SharedRestaurantDto {
  @ApiProperty({
    description: 'A list of supported languages for the restaurant',
    type: [LanguageDto],
    isArray: true,
    example: [
      { id: 1, code: 'en', name: 'English' },
      { id: 2, code: 'fr', name: 'French' },
    ],
  })
  @Expose()
  @Type(() => LanguageDto)
  supportedLanguages: LanguageDto[];
}
