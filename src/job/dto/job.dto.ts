import { ApiProperty } from '@nestjs/swagger';

export class JobDTO {
  @ApiProperty({
    description: 'job_id',
    type: Number,
  })
  job_id: number;

  @ApiProperty({
    description: 'job_name',
    type: String,
  })
  job_name: string;

  @ApiProperty({
    description: 'rating',
    type: Number,
  })
  rating: number;

  @ApiProperty({
    description: 'price',
    type: Number,
  })
  price: number;

  @ApiProperty({
    description: 'creator_id',
    type: Number,
  })
  creator_id: number;

  @ApiProperty({
    description: 'image',
    type: String,
  })
  image: string;

  @ApiProperty({
    description: 'description',
    type: String,
  })
  description: string;

  @ApiProperty({
    description: 'detail_type_id',
    type: Number,
  })
  detail_type_id: number;

  @ApiProperty({
    description: 'short_description',
    type: String,
  })
  short_description: string;

  @ApiProperty({
    description: 'job_rating',
    type: Number,
  })
  job_rating: number;
}
