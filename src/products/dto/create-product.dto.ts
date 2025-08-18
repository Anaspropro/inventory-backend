import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ example: 'Laptop', description: 'Name of the product' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 100, description: 'Price of the product' })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({
    example: 'Product Description',
    description: 'Description of the product',
  })
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({ example: 10, description: 'Quantity of the product' })
  @IsNumber()
  @Min(0)
  quantity: number;

  @ApiProperty({ example: 1, description: 'ID of the category' })
  @IsNumber()
  @IsNotEmpty()
  categoryId: number;
}
