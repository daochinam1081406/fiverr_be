import { ApiProperty } from '@nestjs/swagger';

export class JobTypeDTO {
  @ApiProperty({
    description: 'job_type_id',
    type: Number,
  })
  job_type_id: number;

  @ApiProperty({
    description: 'type_name',
    type: String,
  })
  type_name: string;
}
