import { IsString, IsEmail, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(1)
  name: string;

  @MinLength(1)
  @IsString()
  lastname: string;

  @MinLength(1)
  @IsString()
  password: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  birthday: string;

  @IsString()
  @MinLength(1)
  phone: string;
}
