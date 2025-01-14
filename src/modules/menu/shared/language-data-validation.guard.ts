import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { validateDynamicFields } from 'src/common/util';
import { RestaurantService } from 'src/modules/restaurant';
@Injectable()
export class LanguageDataValidationGuard implements CanActivate {
  constructor(private readonly restaurantService: RestaurantService) {}
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const { restaurantId } = request.params;
    const { content } = request.body;

    const { supportedLanguages } = await this.restaurantService.findOneOrThrow({
      where: { id: restaurantId },
    });

    const supportLang = supportedLanguages.map((language) => language.code);

    const res = validateDynamicFields(
      content,
      ['name', 'description'],
      supportLang,
    );

    if (res) {
      throw new HttpException(res, HttpStatus.BAD_REQUEST);
    }

    return true;
  }
}
