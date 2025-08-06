import {
  IsString,
  IsNumber,
  IsOptional,
  IsEmail,
  IsEnum,
} from 'class-validator';
import { SaleStatus } from '../entities/sale.entity';

export class UpdateSaleDto {
  @IsString()
  @IsOptional()
  customerName?: string;

  @IsEmail()
  @IsOptional()
  customerEmail?: string;

  @IsString()
  @IsOptional()
  customerPhone?: string;

  @IsString()
  @IsOptional()
  notes?: string;

  @IsNumber()
  @IsOptional()
  subtotal?: number;

  @IsNumber()
  @IsOptional()
  tax?: number;

  @IsNumber()
  @IsOptional()
  discount?: number;

  @IsNumber()
  @IsOptional()
  total?: number;

  @IsEnum(SaleStatus)
  @IsOptional()
  status?: SaleStatus;
}
