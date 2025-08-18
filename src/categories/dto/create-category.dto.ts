import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    example: 'Electronics',
    description: 'Name of the category',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'Electronics and gadgets',
    description: 'Description of the category',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;
}
