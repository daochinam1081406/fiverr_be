import { ApiProperty } from '@nestjs/swagger';

export class UserDTO {
  @ApiProperty({ name: 'id', description: 'User ID', type: Number })
  user_id: number;

  @ApiProperty({ name: 'name', description: 'User name', type: String })
  user_name: string;

  @ApiProperty({ name: 'avatar', description: 'Avatar URL', type: String })
  avatar: string;

  @ApiProperty({ name: 'email', description: 'Email address', type: String })
  email: string;

  @ApiProperty({ name: 'password', description: 'Password', type: String })
  pass_word: string;

  @ApiProperty({ name: 'phone', description: 'Phone number', type: Number })
  phone: number;

  @ApiProperty({ name: 'birthday', description: 'Birth day', type: String })
  birth_day: string;

  @ApiProperty({ name: 'gender', description: 'Gender', type: String })
  gender: string;

  @ApiProperty({ name: 'role', description: 'Role', type: String })
  role: string;

  @ApiProperty({ name: 'skill', description: 'Skill', type: String })
  skill: string;

  @ApiProperty({
    name: 'certification',
    description: 'Certification',
    type: String,
  })
  certification: string;
}
