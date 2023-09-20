import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common/';

export const GetUser = createParamDecorator(
  (data, contexto: ExecutionContext) => {
    console.log(data);
    const req = contexto.switchToHttp().getRequest();
    const user = req.user;

    if (!user) throw new InternalServerErrorException('Usuario no encontrado');
    if (data === 'email') {
      return user.email;
    }

    return user;
  },
);
