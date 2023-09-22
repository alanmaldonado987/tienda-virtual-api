import { IsString, MinLength, IsNumber, Min } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @MinLength(1)
  name: string;

  @IsString()
  @MinLength(1)
  description: string;

  @IsNumber()
  @Min(1)
  price: number;

  @IsString()
  @MinLength(1)
  category: string;

  @IsNumber()
  @Min(1)
  stock: number;

  imagePath: Express.Multer.File;
}
