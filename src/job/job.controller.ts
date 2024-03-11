import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Put,
} from '@nestjs/common';
import { JobService } from './job.service';
import { ApiBody, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { JobDTO } from './dto/job.dto';

@ApiTags('Job')
@Controller('api/job')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  // GET JOB (RUN)
  @Get()
  getJob(): Promise<any> {
    return this.jobService.getJob();
  }

  // POST JOB (RUN)
  @Post()
  @ApiBody({ type: JobDTO })
  postJob(@Body() body: JobDTO) {
    return this.jobService.postJob(body);
  }

  // PAGINATION JOB AND SEARCH JOB (RUN)
  @Get('pagination-search-job')
  @ApiQuery({ name: 'pageIndex', type: Number, required: false })
  @ApiQuery({ name: 'pageSize', type: Number, required: false })
  @ApiQuery({ name: 'keyword', type: String, required: false })
  paginationSearchJob(
    @Query('pageIndex') pageIndex: number,
    @Query('pageSize') pageSize: number,
    @Query('keyword') keyword: string,
  ): Promise<any> {
    return this.jobService.paginationSearchJob(pageIndex, pageSize, keyword);
  }

  // GET MENU TYPE JOB
  @Get('/menu-type-job')
  getMenuJobType(): Promise<any> {
    return this.jobService.getMenuJobType();
  }

  // GET JOB BY ID (RUN)
  @Get('/:job_id')
  @ApiParam({ name: 'job_id', type: Number })
  getJobById(@Param('job_id') job_id: number): Promise<any> {
    return this.jobService.getJobById(+job_id);
  }

  // PUT JOB BY ID
  @Put(':job_id')
  @ApiParam({ name: 'job_id', type: Number })
  @ApiBody({ type: JobDTO })
  putJob(@Param('job_id') job_id: number, @Body() body: JobDTO) {
    return this.jobService.putJob(+job_id, body);
  }

  // // DELETE JOB BY ID
  // DELETE COMMENT BY ID COMMENT
  @Delete(':job_id')
  @ApiParam({ name: 'job_id', type: Number })
  async deleteJob(@Query('job_id') job_id: number): Promise<any> {
    return this.jobService.deleteJob(+job_id);
  }

  // // POST UPLOAD IMAGE JOB BY ID
  // @Post('')
  // async uploadImageJob() {}

  // GET DETAIL JOB TYPE BY ID
  @Get('get-job-type-details/:job_type_id')
  @ApiParam({ name: 'job_type_id', type: Number })
  getDetailJobTypeById(
    @Param('job_type_id') job_type_id: number,
  ): Promise<any> {
    return this.jobService.getDetailJobTypeById(+job_type_id);
  }

  // GET JOB BY JOB TYPE ID
  @Get('get-job-by-type-detail/:job_detail_type_id')
  @ApiParam({ name: 'job_detail_type_id', type: Number })
  getJobByJobTypeId(
    @Param('job_detail_type_id') job_detail_type_id: number,
  ): Promise<any> {
    return this.jobService.getJobByJobTypeId(+job_detail_type_id);
  }

  // GET JOB BY JOB ID
  @Get('get-job-by-job-id/:job_id')
  @ApiParam({ name: 'job_id', type: Number })
  getJobByJobId(@Param('job_id') job_id: number) {
    return this.jobService.getJobByJobId(+job_id);
  }

  // GET LIST JOB BY NAME
  @Get('get-list-job/:name_job')
  @ApiParam({ name: 'name_job', type: String })
  getListJobByName(name_job: string): Promise<any> {
    return this.jobService.getListJobByName(name_job);
  }
}