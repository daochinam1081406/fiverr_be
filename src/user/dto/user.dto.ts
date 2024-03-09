import { ApiProperty } from '@nestjs/swagger';

export class UserDTO {
  @ApiProperty({
    description: 'user_id',
    type: Number,
  })
  user_id: number;

  @ApiProperty({
    description: 'user_name',
    type: String,
  })
  user_name: string;

  @ApiProperty({
    description: 'avatar',
    type: String,
  })
  avatar: string;

  @ApiProperty({
    description: 'email',
    type: String,
  })
  email: string;

  @ApiProperty({
    description: 'pass_word',
    type: String,
  })
  pass_word: string;

  @ApiProperty({
    description: 'phone',
    type: Number,
  })
  phone: number;

  @ApiProperty({
    description: 'birth_day',
    type: String,
  })
  birth_day: string;

  @ApiProperty({
    description: 'gender',
    type: String,
  })
  gender: string;

  @ApiProperty({
    description: 'role',
    type: String,
  })
  role: string;

  @ApiProperty({
    description: 'skill',
    type: String,
  })
  skill: string;

  @ApiProperty({
    description: 'certification',
    type: String,
  })
  certification: string;
}

export class DeleteUserDTO {
  @ApiProperty({
    description: 'user_id',
    type: Number,
  })
  user_id: number;
}
