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
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { JobService } from './job.service';
import {
  ApiBody,
  ApiConsumes,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { JobDTO } from './dto/job.dto';
import { JobResponse, JobTypeResponse } from './entities/job.response';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@ApiTags('Job')
@Controller('api/job')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Get()
  getUser(): Promise<JobResponse> {
    return this.jobService.getJob();
  }

  @Post('')
  @ApiBody({ type: JobDTO })
  async postJob(@Body() body: JobDTO): Promise<JobResponse> {
    return this.jobService.postJob(body);
  }

  @Get('pagination-search-job')
  @ApiQuery({ name: 'pageIndex', type: Number, required: false })
  @ApiQuery({ name: 'pageSize', type: Number, required: false })
  @ApiQuery({ name: 'keyword', type: String, required: false })
  paginationSearchJob(
    @Query('pageIndex') pageIndex: number,
    @Query('pageSize') pageSize: number,
    @Query('keyword') keyword: string,
  ): Promise<JobResponse> {
    return this.jobService.paginationSearchJob(pageIndex, pageSize, keyword);
  }

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

  // DELETE JOB BY ID
  @Delete(':job_id')
  @ApiParam({ name: 'job_id', type: Number })
  async deleteJob(@Query('job_id') job_id: number): Promise<any> {
    return this.jobService.deleteJob(+job_id);
  }

  // POST UPLOAD IMAGE JOB BY ID
  @ApiParam({ name: 'job_id', required: true })
  @Post('/upload-job-image/:job_id')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Upload a file',
    type: 'multipart/form-data',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: process.cwd() + '/public/img',
        filename: (req, file, callback) => {
          callback(null, new Date().getTime() + `${file.originalname}`);
        },
      }),
    }),
  )
  uploadJob(
    @UploadedFile('file') file,
    @Param('job_id') job_id: number,
    @Body() body: JobDTO,
  ): Promise<any> {
    return this.jobService.uploadJob(file.filename, +job_id, body);
  }

  @Get('get-job-type-details/:job_type_id')
  @ApiParam({ name: 'job_type_id', type: Number })
  getDetailJobTypeById(
    @Param('job_type_id') job_type_id: number,
  ): Promise<any> {
    return this.jobService.getDetailJobTypeById(+job_type_id);
  }

  @Get('get-job-by-detail-type/:detail_type_id')
  @ApiParam({ name: 'detail_type_id', type: Number })
  getJobByDetailType(
    @Param('detail_type_id') detail_type_id: number,
  ): Promise<any> {
    return this.jobService.getJobByDetailType(detail_type_id);
  }

  @Get('get-list-job/:job_name')
  @ApiParam({ name: 'job_name', type: String })
  getListJobByName(job_name: string): Promise<any> {
    return this.jobService.getListJobByName(job_name);
  }
}
