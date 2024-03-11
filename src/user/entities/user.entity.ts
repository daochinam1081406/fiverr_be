import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({ name: 'id', description: 'User ID' })
  user_id: number;

  @Column()
  @ApiProperty({ name: 'name', description: 'User name' })
  user_name: string;

  @Column()
  @ApiProperty({ name: 'avatar', description: 'Avatar URL' })
  avatar: string;

  @Column()
  @ApiProperty({ name: 'email', description: 'Email address' })
  email: string;

  @Column()
  @ApiProperty({ name: 'password', description: 'Password' })
  pass_word: string;

  @Column({ type: 'date' })
  @ApiProperty({ name: 'birthday', description: 'Birth day' })
  birth_day: Date;

  @Column()
  @ApiProperty({ name: 'gender', description: 'Gender' })
  gender: string;

  @Column()
  @ApiProperty({ name: 'role', description: 'Role' })
  role: string;

  @Column()
  @ApiProperty({ name: 'phone', description: 'Phone number' })
  phone: number;

  @Column()
  @ApiProperty({ name: 'skill', description: 'Skill' })
  skill: string;

  @Column()
  @ApiProperty({ name: 'certification', description: 'Certification' })
  certification: string;
}
