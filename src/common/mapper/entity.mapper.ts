import { Injectable } from '@nestjs/common';
import { ClassConstructor, plainToClass } from 'class-transformer';

@Injectable()
export class EntityMapper {
  toEntity<T, V>(dto: V, entityClass: ClassConstructor<T>): T {
    return plainToClass(entityClass, dto, { excludeExtraneousValues: false });
  }

  toDto<T, V>(entity: T, dtoClass: ClassConstructor<V>): V {
    return plainToClass(dtoClass, entity, { excludeExtraneousValues: true });
  }

  toDtos<T, V>(entities: T[], dtoClass: ClassConstructor<V>): V[] {
    return entities.map((entity) => this.toDto(entity, dtoClass));
  }
}
