import { Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from 'src/common/dto';
import { TranslationDto } from './translation/translation.dto';

export class SharedMenuDto extends BaseDto {
  @ApiProperty({
    description: 'A list of translations for the shared menu',
    type: [TranslationDto],
  })
  @Type(() => TranslationDto)
  @Expose()
  content: TranslationDto[];
}
