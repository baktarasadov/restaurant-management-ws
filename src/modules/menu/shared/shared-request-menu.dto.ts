import { IsArray, IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { CreateTranslationDto } from './translation/request-translation.dto';

export class SharedCreateMenuDto {
  @ApiProperty({
    description: 'The list of translations for different languages',
    type: [CreateTranslationDto],
  })
  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateTranslationDto)
  content: CreateTranslationDto[];
}
