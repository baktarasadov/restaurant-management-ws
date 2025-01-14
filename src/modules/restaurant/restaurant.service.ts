import { Injectable } from '@nestjs/common';
import { RestaurantRepository } from './restaurant.repository';
import { EntityMapper } from 'src/common/mapper';
import { CreateRestaurantDto } from './dto/request/create-restaurant.dto';
import { RestaurantEntity } from './entity/restaurant.entity';
import { RestaurantDto } from './dto/restaurant.dto';
import { UpdateRestaurantDto } from './dto/request/update-restaurant.dto';
import { LanguageService } from '../language';
import { convertDateToTimeZone } from 'src/common/util';

@Injectable()
export class RestaurantService {
  constructor(
    private readonly restaurantRepository: RestaurantRepository,
    private readonly languageService: LanguageService,
    private readonly entityMapper: EntityMapper,
  ) {}

  public async create(createRestaurantDto: CreateRestaurantDto) {
    const languages = await this.languageService.findByIdsOrThrow(
      createRestaurantDto.supportedLanguages,
    );

    const restaurant = this.entityMapper.toEntity(
      createRestaurantDto,
      RestaurantEntity,
    );

    restaurant.supportedLanguages = languages;

    const data = await this.restaurantRepository.save(restaurant);

    return this.entityMapper.toDto(data, RestaurantDto);
  }

  public async findByIdOrThrow(id: number) {
    const data = await this.restaurantRepository.findOneOrThrow({
      where: { id },
      relations: ['supportedLanguages'],
    });

    const result = convertDateToTimeZone<RestaurantEntity>(data, data.timeZone);

    return this.entityMapper.toDto(result, RestaurantDto);
  }

  public async findOneOrThrow(query: any) {
    return await this.restaurantRepository.findOneOrThrow({
      ...query,
      relations: ['supportedLanguages', 'branches'],
    });
  }

  public async deleteById(id: number) {
    await this.findByIdOrThrow(id);
    await this.restaurantRepository.deleteById(id);
  }

  public async updateById(
    id: number,
    updateRestaurantDto: UpdateRestaurantDto,
  ) {
    await this.findByIdOrThrow(id);

    const data = await this.restaurantRepository.updateById(
      id,
      this.entityMapper.toEntity(updateRestaurantDto, RestaurantEntity),
    );

    return this.entityMapper.toDto(data, RestaurantDto);
  }

  public async findAll() {
    const data = await this.restaurantRepository.find({
      relations: ['supportedLanguages'],
    });

    return this.entityMapper.toDtos(data, RestaurantDto);
  }
}
