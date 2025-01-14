import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTranslationDto {
  @ApiProperty({
    description: 'The code representing the language (e.g., "en" for English)',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  languageCode: string;

  @ApiProperty({
    description: 'The name of the language (e.g., "English")',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description:
      'The description of the language (e.g., "English is widely spoken")',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  description: string;
}
