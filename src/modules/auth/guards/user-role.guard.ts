import {
  CanActivate,
  ExecutionContext,
  Injectable,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { User } from '../entities/auth.entity';

@Injectable()
export class UserRoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const validRoles: string[] = this.reflector.get(
      'roles',
      context.getHandler(),
    );

    const req = context.switchToHttp().getRequest();
    const user = req.user as User;

    if (!user) throw new BadRequestException('Usuario no encontrado');

    if (validRoles.includes(user.role)) {
      return true;
    }

    throw new ForbiddenException(
      `El usuario: ${user.name} necesita el rol de ${validRoles}`,
    );
  }
}
