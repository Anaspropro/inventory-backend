import { IsNotEmpty, IsNumber, IsString, IsDate } from 'class-validator';

export class CreateInventoryMovementDto {
  @IsNotEmpty()
  @IsNumber()
  productId: number;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  @IsString()
  movementType: string; // 'IN' or 'OUT'

  @IsString()
  notes?: string;

  @IsDate()
  movementDate: Date;
}
