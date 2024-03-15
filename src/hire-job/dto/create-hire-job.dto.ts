import { ApiProperty } from '@nestjs/swagger';
import { IsISO8601, IsNumber } from 'class-validator';

export class CreateHireJobDto {
  @ApiProperty({ type: Number, description: 'ID JOB', required: true })
  @IsNumber()
  job_id : number;
  @ApiProperty({ type: Number, description: 'HIRER', required: true })
  @IsNumber()
  employer_id: number;
  @ApiProperty({ type: String, description: 'DATE HIRED', required: true ,default: new Date().toISOString()})
  @IsISO8601({ strict: true })
  hire_date: string;
  
  @ApiProperty({ type: Boolean, description: 'FINISHED', required: true })
  completed: boolean;

  
}
