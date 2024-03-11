import { ApiProperty } from '@nestjs/swagger';

export class JobDetalTypeDTO {
  @ApiProperty({
    description: 'job_detail_type_id',
    type: Number,
  })
  job_detail_type_id: number;

  @ApiProperty({
    description: 'detail_name',
    type: String,
  })
  detail_name: string;

  @ApiProperty({
    description: 'image',
    type: String,
  })
  image: string;

  @ApiProperty({
    description: 'job_type_id',
    type: Number,
  })
  job_type_id: number;
}
