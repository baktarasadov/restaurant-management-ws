import { BaseCreateRestaurantDto } from './base-request-restaurant.dto';
import {
  IsNotEmpty,
  IsArray,
  ArrayNotEmpty,
  ArrayMinSize,
  IsNumber,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRestaurantDto extends BaseCreateRestaurantDto {
  @ApiProperty({
    description: 'List of supported language IDs for the restaurant',
    example: [1, 2],
    type: [Number],
    isArray: true,
    minItems: 1,
  })
  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  @IsNotEmpty({ each: true })
  @IsNumber({}, { each: true })
  supportedLanguages: number[];
}
