import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsBoolean,
  IsEmail,
} from 'class-validator';

export class CreateSupplierDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  contactPerson?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  website?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
