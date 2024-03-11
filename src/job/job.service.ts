import { HttpException, HttpStatus, Injectable, Query } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { JobDTO } from './dto/job.dto';
import { ApiParam } from '@nestjs/swagger';
import { JobResponse, JobTypeResponse } from './entities/job.response';
import { JobEntity } from './entities/job.entity';

@Injectable()
export class JobService {
  private prisma = new PrismaClient();

  async getJob(): Promise<JobResponse> {
    try {
      const data: JobEntity[] = await this.prisma.job.findMany();
      return { statusCode: 200, content: data, message: 'Get job success!' };
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Internal server error',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async postJob(body: JobDTO): Promise<JobResponse> {
    try {
      const {
        job_id,
        creator_id,
        description,
        detail_type_id,
        image,
        job_name,
        job_rating,
        price,
        rating,
        short_description,
      } = body;
      const checkJobDB = await this.prisma.job.findFirst({
        where: { job_id },
      });
      if (checkJobDB) {
        throw new HttpException('Job already exists!', HttpStatus.BAD_REQUEST);
      } else {
        const newJob: JobEntity = await this.prisma.job.create({
          data: {
            job_id,
            creator_id,
            description,
            detail_type_id,
            image,
            job_name,
            job_rating,
            price,
            rating,
            short_description,
          },
        });
        return {
          statusCode: 201,
          content: [newJob],
          message: 'Job created successfully!',
        };
      }
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Internal server error',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async paginationSearchJob(
    pageIndex: number,
    pageSize: number,
    keyword: string,
  ): Promise<JobResponse> {
    try {
      const skip = (pageIndex - 1) * pageSize;
      const data: JobEntity[] = await this.prisma.job.findMany({
        skip: skip,
        take: Number(pageSize),
        where: {
          job_name: {
            contains: keyword,
          },
        },
      });

      if (!data || data.length === 0) {
        throw new HttpException('No jobs found', HttpStatus.NOT_FOUND);
      }

      return {
        statusCode: HttpStatus.OK,
        content: data,
        message: 'Successfully retrieved jobs with pagination and search!',
      };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: `Error retrieving jobs: ${error.message}`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getJobById(job_id: number): Promise<any> {
    try {
      const job = await this.prisma.job.findUnique({
        where: {
          job_id: job_id,
        },
      });
      return {
        status: 200,
        data: job,
        message: 'Success',
      };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: `Error retrieving users: ${error.message}`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async putJob(job_id: number, body: JobDTO): Promise<any> {
    const {
      creator_id,
      description,
      detail_type_id,
      image,
      job_name,
      job_rating,
      price,
      rating,
      short_description,
    } = body;
    const jobDB = await this.prisma.job.findFirst({
      where: { job_id },
    });
    if (jobDB) {
      const newJob = {
        creator_id,
        description,
        detail_type_id,
        image,
        job_name,
        job_rating,
        price,
        rating,
        short_description,
      };
      await this.prisma.job.update({
        where: {
          job_id,
        },
        data: newJob,
      });
    }
  }

  // NO RUN
  async deleteJob(job_id: number): Promise<any> {
    const jobDB = await this.prisma.comments.findFirst({
      where: {
        job_id: job_id,
      },
    });
    if (jobDB) {
      await this.prisma.job.delete({
        where: { job_id },
      });
      return {
        status: 200,
        message: 'Delete successfull!',
      };
    } else {
      return {
        status: 400,
        message: 'Delete fail!',
      };
    }
  }

  // // POST UPLOAD IMAGE JOB BY ID
  // async uploadImageJob() {}

  async getMenuJobType(): Promise<any> {
    try {
      const data = await this.prisma.jobType.findMany({
        include: {
          JobDetailType: true,
        },
      });

      if (!data || data.length === 0) {
        return {
          statusCode: 404,
          message: 'Menu job type not found',
          content: data,
        };
      }

      return {
        statusCode: 200,
        content: data,
        message: 'Successfull!',
      };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: `Error retrieving users: ${error.message}`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getDetailJobTypeById(job_type_id: number): Promise<any> {
    try {
      const jobTypeIdDB = await this.prisma.jobType.findFirst({
        where: {
          job_type_id,
        },
      });
      if (jobTypeIdDB) {
        const data = await this.prisma.jobType.findUnique({
          where: {
            job_type_id,
          },
          include: {
            JobDetailType: true,
          },
        });
        return {
          message: 'Successfull!',
          data: data,
        };
      } else {
        return {
          message: 'Job type id not found!',
        };
      }
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: `Error retrieving users: ${error.message}`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  // GET JOB BY JOB TYPE ID (NO RUN)
  async getJobByJobTypeId(job_detail_type_id: number): Promise<any> {
    const jobDetailTypeIdDB = await this.prisma.jobType.findFirst({
      where: {},
    });
    if (jobDetailTypeIdDB) {
      const data = await this.prisma.jobDetailType.findMany({
        where: { job_detail_type_id },
      });
    }
  }

  // GET JOB BY JOB ID (NO RUN)
  async getJobByJobId(job_id: number): Promise<any> {
    return;
  }

  // NO RUN
  async getListJobByName(name_job: string): Promise<any> {}
}
