import { SetMetadata } from '@nestjs/common';
import { ValidRoles } from '../interfaces/validRoles.interface';

export const RoleProtected = (...args: ValidRoles[]) => {
  return SetMetadata('roles', args);
};
