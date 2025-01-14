import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { RestaurantService } from 'src/modules/restaurant';
@Injectable()
export class SharedMenuGuard implements CanActivate {
  constructor(private readonly restaurantService: RestaurantService) {}
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const { restaurantId, branchId } = request.params;
    const { timeZone } = await this.restaurantService.findOneOrThrow({
      where: { id: restaurantId },
    });

    request.headers['timezone'] = timeZone;

    if (branchId) {
      const { branches } = await this.restaurantService.findOneOrThrow({
        where: {
          branches: {
            id: branchId,
          },
        },
      });

      const result = branches[0];

      request.headers['timezone'] = result.timeZone;
    }
    return true;
  }
}
