import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsDate,
  IsEnum,
  IsNumber,
} from 'class-validator';
import { ReportType, ReportFormat } from '../entities/report.entity';

export class CreateReportDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(ReportType)
  type?: ReportType;

  @IsOptional()
  @IsEnum(ReportFormat)
  format?: ReportFormat;

  @IsOptional()
  @IsString()
  parameters?: string;

  @IsOptional()
  @IsNumber()
  userId?: number;

  @IsOptional()
  @IsDate()
  generatedAt?: Date;
}
