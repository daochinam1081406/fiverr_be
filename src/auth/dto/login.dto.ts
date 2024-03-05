import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class AuthLoginDTO {
  @ApiProperty({ type: String, description: 'email' })
  @IsEmail()
  email: string;
  @ApiProperty({ type: String, description: 'password' })
  @IsNotEmpty()
  pass_word: string;
}
