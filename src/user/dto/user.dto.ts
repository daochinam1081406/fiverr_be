import { ApiProperty } from '@nestjs/swagger';

export class UserDTO {
  @ApiProperty({ description: 'User ID', type: Number })
  user_id: number;

  @ApiProperty({ description: 'User name', type: String })
  user_name: string;

  @ApiProperty({ description: 'Avatar URL', type: String })
  avatar: string;

  @ApiProperty({ description: 'Email address', type: String })
  email: string;

  @ApiProperty({ description: 'Password', type: String })
  pass_word: string;

  @ApiProperty({ description: 'Phone number', type: Number })
  phone: number;

  @ApiProperty({ description: 'Birth day', type: String })
  birth_day: string;

  @ApiProperty({ description: 'Gender', type: String })
  gender: string;

  @ApiProperty({ description: 'Role', type: String })
  role: string;

  @ApiProperty({ description: 'Skill', type: String })
  skill: string;

  @ApiProperty({
    description: 'Certification',
    type: String,
  })
  certification: string;
}
