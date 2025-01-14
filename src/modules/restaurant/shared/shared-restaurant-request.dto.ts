import { IsNotEmpty, IsString, IsTimeZone } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SharedRestaurantRequestDto {
  @ApiProperty({
    description: 'The name of the restaurant',
    example: 'My Restaurant',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'The time zone in which the restaurant operates',
    example: 'Asia/Baku',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  @IsTimeZone()
  timeZone: string;
}
