import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

// Define a DTO for the sale items
export class SaleItemDto {
  @ApiProperty({ example: 1, description: 'Product ID' })
  @IsPositive()
  productId: number;

  @ApiProperty({ example: 2, description: 'Quantity of the product' })
  @IsPositive()
  quantity: number;

  @ApiProperty({ example: 99.99, description: 'Unit price of the product' })
  @IsNumber()
  @IsPositive()
  unitPrice: number;

  @ApiProperty({ example: 199.98, description: 'Total price for this item' })
  @IsNumber()
  @IsPositive()
  totalPrice: number;
}

export class CreateSaleDto {
  @ApiProperty({
    type: () => [SaleItemDto],
    description: 'List of items in the sale',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SaleItemDto)
  saleItems: SaleItemDto[];

  @ApiProperty({
    example: 'Customer requested gift wrapping',
    description: 'Additional notes for the sale',
    required: false,
  })
  @IsString()
  @IsOptional()
  notes?: string;

  @ApiProperty({
    example: 199.98,
    description: 'Subtotal before tax and discount',
  })
  @IsNumber()
  @IsPositive()
  subtotal: number;

  @ApiProperty({
    example: 16.0,
    description: 'Tax amount',
    required: false,
  })
  @IsNumber()
  @Min(0)
  @IsOptional()
  tax?: number;

  @ApiProperty({
    example: 10.0,
    description: 'Discount amount',
    required: false,
  })
  @IsNumber()
  @Min(0)
  @IsOptional()
  discount?: number;

  @ApiProperty({
    example: 205.98,
    description: 'Total amount (subtotal + tax - discount)',
  })
  @IsNumber()
  @IsPositive()
  total: number;
}
