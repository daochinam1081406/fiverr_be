import { Module } from '@nestjs/common';
import { JobTypeDetailService } from './job-type-detail.service';
import { JobTypeDetailController } from './job-type-detail.controller';

@Module({
  controllers: [JobTypeDetailController],
  providers: [JobTypeDetailService],
})
export class JobTypeDetailModule {}
