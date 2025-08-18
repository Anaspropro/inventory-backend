import { PartialType, ApiPropertyOptional } from '@nestjs/swagger';
import { CreateSaleDto } from './create-sale.dto';
import { IsEnum, IsOptional } from 'class-validator';
import { SaleStatus } from '../enums/sale-status.enum';

export class UpdateSaleDto extends PartialType(CreateSaleDto) {
  @ApiPropertyOptional({ enum: SaleStatus, description: 'Sale status' })
  @IsEnum(SaleStatus)
  @IsOptional()
  status?: SaleStatus;
}
