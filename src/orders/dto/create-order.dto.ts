import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsOptional,
  IsDate,
} from 'class-validator';
import { OrderStatusType } from '../entities/order.entity';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsString()
  orderNumber: string;

  @IsNotEmpty()
  @IsNumber()
  supplierId: number;

  @IsOptional()
  @IsString()
  status?: OrderStatusType;

  @IsOptional()
  @IsNumber()
  totalAmount?: number;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsDate()
  expectedDeliveryDate?: Date;
}
