import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsString } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  firstname: string;

  @IsString()
  lastname: string;

  @IsString()
  department: string;

  @IsString()
  role: 'admin' | 'user' | 'guest';
}
