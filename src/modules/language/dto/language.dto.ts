import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class LanguageDto {
  @ApiProperty({
    description: 'The unique identifier of the language',
    type: Number,
  })
  @Expose()
  id: number;

  @ApiProperty({
    description: 'The code representing the language (e.g., "en" for English)',
    type: String,
  })
  @Expose()
  code: string;

  @ApiProperty({
    description: 'The name of the language (e.g., "English")',
    type: String,
  })
  @Expose()
  name: string;
}
