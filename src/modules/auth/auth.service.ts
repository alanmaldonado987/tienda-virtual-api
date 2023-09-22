import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/auth.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt/dist';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}
  async registerUser(createUserDto: CreateUserDto) {
    try {
      const { password, ...userData } = createUserDto;
      const newUser = this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync(password, 5),
      });
      await this.userRepository.save(newUser);

      return { ...newUser, token: this.getJwtToken({ id: newUser.id }) };
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async loginUser(loginUserDto: LoginUserDto) {
    let { password, email } = loginUserDto;

    const user = await this.userRepository.findOne({
      where: { email: email },
      select: { email: true, password: true, id: true }, //Solo recibir estos datos
    });

    console.log({ user });

    if (!user) throw new NotFoundException('Credenciales no validas');

    if (!bcrypt.compareSync(password, user.password))
      // Comparar password encriptada con la de la bd
      throw new UnauthorizedException('Contraseña no valida');

    const role = await this.getUserRole(user);

    if (role === 'user')
      throw new UnauthorizedException('No tienes permisos para acceder!');

    return { ...user, role: role, token: this.getJwtToken({ id: user.id }) };
  }

  async getUserRole(user: User) {
    const findUser = await this.userRepository.findOne({
      where: { email: user.email },
    });

    const { role } = findUser;

    if (!role) throw new BadRequestException('Este usuario no tiene rol.');

    return role;
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    console.log(token);
    return token;
  }

  private handleDBErrors(error: any): void {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }

    console.log(error);
  }
}
