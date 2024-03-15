import { JobDetailTypeEntity, JobEntity, JobTypeEntity } from './job.entity';

export class JobResponse {
  statusCode: number;
  content: JobEntity[];
  message: string;
}

export class JobDetailTypeResponse {
  statusCode: number;
  content: JobDetailTypeEntity[];
  message: string;
}
export class JobTypeResponse {
  statusCode: number;
  // content: JobTypeEntity[];
  content: (JobTypeEntity & { JobDetailType: JobDetailTypeEntity[] })[];
  message: string;
}
