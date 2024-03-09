import { ApiProperty } from '@nestjs/swagger';

export class CommentsDTO {
  @ApiProperty({
    description: 'comment_id',
    type: Number,
  })
  comment_id: number;

  @ApiProperty({
    description: 'job_id',
    type: Number,
  })
  job_id: number;

  @ApiProperty({
    description: 'commenter_id',
    type: Number,
  })
  commenter_id: number;

  @ApiProperty({
    description: 'comment_date',
    type: String,
  })
  comment_date: string;

  @ApiProperty({
    description: 'content',
    type: String,
  })
  content: string;

  @ApiProperty({
    description: 'comment_rating',
    type: Number,
  })
  comment_rating: number;
}
