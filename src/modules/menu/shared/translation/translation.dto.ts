import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class TranslationDto {
  @ApiProperty({
    description: 'The name of the translation',
    type: String,
  })
  @Expose()
  name: string;

  @ApiProperty({
    description: 'The description of the translation',
    type: String,
  })
  @Expose()
  description: string;

  @ApiProperty({
    description:
      'The language code for the translation (e.g., "en" for English)',
    type: String,
  })
  @Expose()
  languageCode: string;
}
