import { Injectable, NotFoundException } from '@nestjs/common';
import { FindOneOptions, Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

@Injectable()
export class GenericRepository<T> {
  constructor(private readonly repository: Repository<T>) {}

  public async save(entity: T): Promise<T> {
    return this.repository.save(entity);
  }

  public async remove(entity: T): Promise<T> {
    return this.repository.remove(entity);
  }

  public async findById(id: number): Promise<null | T> {
    return this.repository.findOneBy({
      id,
    } as any);
  }

  public async findAll(): Promise<T[]> {
    return this.repository.find();
  }

  public async findOne(options: FindOneOptions<T>): Promise<null | T> {
    return this.repository.findOne(options);
  }

  public async find(options: FindOneOptions<T>): Promise<T[]> {
    return this.repository.find(options);
  }

  public async updateById(
    id: number,
    entity: QueryDeepPartialEntity<T>,
  ): Promise<null | T> {
    const result = await this.repository.update(id, entity);

    if (result.affected === 0) {
      return null;
    }

    return this.findById(id);
  }

  public async deleteById(id: number): Promise<null | T> {
    const entity = await this.findById(id);

    if (!entity) {
      return null;
    }

    return this.repository.remove(entity);
  }

  public async findByIdOrThrow(id: number): Promise<T> {
    const entity = await this.findById(id);
    if (!entity) {
      throw new NotFoundException(`Resource not found`);
    }
    return entity;
  }

  public async findOneOrThrow(options: FindOneOptions<T>): Promise<T> {
    const entity = await this.findOne(options);
    if (!entity) {
      throw new NotFoundException(`Resource not found`);
    }
    return entity;
  }

  public async count(): Promise<number> {
    return this.repository.count();
  }

  public async countWhere(options: FindOneOptions<T>): Promise<number> {
    return this.repository.count(options);
  }

  public async query(query: string): Promise<T[]> {
    return this.repository.query(query);
  }

  public async createQueryBuilderWithAlias(alias: string) {
    return this.repository.createQueryBuilder(alias);
  }

  public async removeMany(entity: T[]): Promise<T[]> {
    return this.repository.remove(entity);
  }
}
