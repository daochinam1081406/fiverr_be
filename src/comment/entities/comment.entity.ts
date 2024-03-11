import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class CommentEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'Comment ID' })
  comment_id: number;

  @Column()
  @ApiProperty({ description: 'Job ID' })
  job_id: number;

  @Column()
  @ApiProperty({ description: 'Commenter ID' })
  commenter_id: number;

  @Column()
  @ApiProperty({ description: 'Comment Date' })
  comment_date: Date;

  @Column()
  @ApiProperty({ description: 'Content' })
  content: string;

  @Column()
  @ApiProperty({ description: 'Comment Rating' })
  comment_rating: number;
}
