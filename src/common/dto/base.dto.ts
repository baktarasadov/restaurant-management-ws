import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class BaseDto {
  @ApiProperty({
    description: 'Unique identifier of the entity',
    example: 1,
  })
  @Expose()
  id: number;

  @ApiProperty({
    description: 'Date when the entity was created',
    example: '2024-01-14T12:34:56.789Z',
  })
  @Expose()
  createdAt: Date | string;

  @ApiProperty({
    description: 'Date when the entity was last updated',
    example: '2024-01-14T14:56:12.345Z',
  })
  @Expose()
  updatedAt: Date | string;
}
