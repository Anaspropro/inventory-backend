import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import {
  IsString,
  IsNumber,
  IsOptional,
  Min,
  IsBoolean,
} from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsBoolean()
  @IsOptional()
  inStock: boolean;

  @IsNumber()
  @Min(0)
  quantity: number;
}
