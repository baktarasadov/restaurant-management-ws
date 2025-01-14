import { Expose } from 'class-transformer';
import { SharedRestaurantDto } from '../../restaurant/shared/shared-restaurant.dto';
import { ApiProperty } from '@nestjs/swagger';

export class BranchDto extends SharedRestaurantDto {
  @ApiProperty({
    description: 'The location of the branch',
    example: '123 Main St, Springfield',
  })
  @Expose()
  location: string;
}
