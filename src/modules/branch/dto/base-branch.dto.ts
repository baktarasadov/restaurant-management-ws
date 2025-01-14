import { IsNotEmpty, IsString } from 'class-validator';
import { SharedRestaurantRequestDto } from '../../restaurant/shared';
import { ApiProperty } from '@nestjs/swagger';

export class BaseBranchDto extends SharedRestaurantRequestDto {
  @ApiProperty({
    description: 'The location of the branch',
    example: '123 Main St, Springfield',
  })
  @IsString()
  @IsNotEmpty()
  location: string;
}
