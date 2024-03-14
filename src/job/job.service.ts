import { HttpException, HttpStatus, Injectable, Query } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { JobDTO } from './dto/job.dto';
import { JobResponse } from './entities/job.response';
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

  async uploadJob(
    filename: string,
    job_id: number,
    body: JobDTO,
  ): Promise<any> {
    let upload = { ...body };
    upload.image = filename;
    await this.prisma.job.update({
      where: {
        job_id: job_id,
      },
      data: upload,
    });
    return `Upload Image success !`;
  }

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
  // GET JOB BY DETAIL TYPE
  async getJobByDetailType(detail_type_id: number): Promise<any> {
    const checkIdDB = this.prisma.job.findFirst({
      where: {
        detail_type_id: Number(detail_type_id),
      },
    });
    if (checkIdDB) {
      const listJob = await this.prisma.job.findMany({
        where: {
          detail_type_id: Number(detail_type_id),
        },
        include: {
          JobDetailType: {
            include: { JobType: true },
          },
          Users: {
            select: { user_name: true },
          },
        },
      });
      const data = listJob.map((item) => ({
        detail_type_id: item.detail_type_id,
        job: {
          job_id: item.job_id,
          job_name: item.job_name,
          rating: item.rating,
          price: item.price,
          image: item.image,
          description: item.description,
          short_description: item.short_description,
          job_rating: item.job_rating,
          detail_type_id: item.detail_type_id,
          creator_id: item.creator_id,
        },
        detail_name: item.JobDetailType.detail_name,
        type_name: item.JobDetailType.JobType.type_name,
        user_name: item.Users.user_name,
      }));
      return { statusCode: 200, message: 'Get success!', content: data };
    } else {
      return { statusCode: 400, message: 'Not found!', content: [] };
    }
  }
  // // NO RUN
  async getListJobByName(job_name: string): Promise<any> {
    const checkJobs = await this.prisma.job.findMany({
      where: {
        job_name: {
          contains: job_name,
        },
      },
      include: {
        JobDetailType: {
          include: {
            JobType: true,
          },
        },
        Users: {
          select: { user_name: true },
        },
      },
    });

    if (checkJobs.length > 0) {
      const listJobByName = checkJobs.map((checkJob) => ({
        job_id: checkJob.job_id,
        congViec: {
          job_id: checkJob.job_id,
          job_name: checkJob.job_name,
          rating: checkJob.rating,
          price: checkJob.price,
          image: checkJob.image,
          description: checkJob.description,
          short_description: checkJob.short_description,
          job_rating: checkJob.job_rating,
          detail_type_id: checkJob.detail_type_id,
          creator_id: checkJob.creator_id,
        },
        detail_name: checkJob.JobDetailType.detail_name,
        type_name: checkJob.JobDetailType.JobType.type_name,
        user_name: checkJob.Users.user_name,
      }));

      return { statusCode: 200, message: '', content: listJobByName };
    } else {
      return {
        statusCode: 404,
        message: 'Không tìm thấy công việc.',
        content: null,
      };
    }
  }
}
