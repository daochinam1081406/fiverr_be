import { PartialType } from '@nestjs/swagger';
import { CreateJobTypeDetailDto } from './create-job-type-detail.dto';

export class UpdateJobTypeDetailDto extends PartialType(CreateJobTypeDetailDto) {}
