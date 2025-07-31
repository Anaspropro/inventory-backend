import { IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  firstname: string;

  @IsString()
  lastname: string;

  @IsString()
  department: string;

  @IsString()
  role: 'admin' | 'user' | 'guest';
}
