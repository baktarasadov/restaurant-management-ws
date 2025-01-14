import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from 'src/common/dto';

export class SharedRestaurantDto extends BaseDto {
  @ApiProperty({
    description: 'The name of the restaurant',
    example: 'My Restaurant',
    type: String,
  })
  @Expose()
  name: string;

  @ApiProperty({
    description: 'The time zone in which the restaurant operates',
    example: 'Asia/Baku',
    type: String,
  })
  @Expose()
  timeZone: string;
}
