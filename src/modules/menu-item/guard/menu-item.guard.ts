import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { MenuService } from '../../menu/menu.service';
@Injectable()
export class MenuItemGuard implements CanActivate {
  constructor(private readonly menuService: MenuService) {}
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const { restaurantId, menuId } = request.params;

    await this.menuService.findByIdOrThrow(restaurantId, menuId);

    return true;
  }
}
