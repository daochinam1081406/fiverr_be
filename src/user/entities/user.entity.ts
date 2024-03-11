import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'User ID' })
  user_id: number;

  @Column()
  @ApiProperty({ description: 'User name' })
  user_name: string;

  @Column()
  @ApiProperty({ description: 'Avatar URL' })
  avatar: string;

  @Column()
  @ApiProperty({ description: 'Email address' })
  email: string;

  @Column()
  @ApiProperty({ description: 'Password' })
  pass_word: string;

  @Column({ type: 'date' })
  @ApiProperty({ description: 'Birth day' })
  birth_day: Date;

  @Column()
  @ApiProperty({ description: 'Gender' })
  gender: string;

  @Column()
  @ApiProperty({ description: 'Role' })
  role: string;

  @Column()
  @ApiProperty({ description: 'Phone number' })
  phone: number;

  @Column()
  @ApiProperty({ description: 'Skill' })
  skill: string;

  @Column()
  @ApiProperty({ description: 'Certification' })
  certification: string;
}
