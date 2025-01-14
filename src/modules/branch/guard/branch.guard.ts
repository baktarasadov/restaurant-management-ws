import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { RestaurantService } from '../../restaurant/restaurant.service';

@Injectable()
export class BranchGuard implements CanActivate {
  constructor(private readonly restaurantService: RestaurantService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const { restaurantId } = request.params;

    const { timeZone } =
      await this.restaurantService.findByIdOrThrow(restaurantId);

    request.headers['timezone'] = timeZone;

    return true;
  }
}
