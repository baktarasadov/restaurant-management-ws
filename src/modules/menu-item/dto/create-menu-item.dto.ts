import { IsNumber, IsOptional } from 'class-validator';
import { BaseMenuItemDto } from './base-menu-item.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMenuItemDto extends BaseMenuItemDto {
  @ApiProperty({
    description: 'The branch number associated with the menu (optional)',
    type: Number,
    required: false,
    example: 1,
  })
  @IsOptional()
  @IsNumber()
  branch: number;
}
