import { Injectable, Query } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { JobDTO } from './dto/job.dto';
import { ApiParam } from '@nestjs/swagger';

@Injectable()
export class JobService {
  private prisma = new PrismaClient();

  // GET JOB (RUN)
  async getJob(): Promise<any> {
    return await this.prisma.job.findMany();
  }

  // POST JOB (RUN)
  async postJob(body: JobDTO) {
    try {
      const {
        job_id,
        job_name,
        rating,
        price,
        creator_id,
        image,
        description,
        detail_type_id,
        short_description,
        job_rating,
      } = body;

      const newJob = {
        job_name,
        rating,
        price,
        creator_id,
        image,
        description,
        detail_type_id,
        short_description,
        job_rating,
      };

      await this.prisma.job.create({ data: newJob });
      return { status: 200, message: 'Create job successfull!' };
    } catch (error) {
      return { status: 500, message: `${error}` };
    }
  }

  // PAGINATION JOB AND SEARCH JOB (RUN)
  async paginationSearchJob(
    pageIndex: number,
    pageSize: number,
    keyword: string,
  ): Promise<any> {
    try {
      const skip = (pageIndex - 1) * pageSize;
      const data = await this.prisma.job.findMany({
        skip: skip,
        take: Number(pageSize),
        where: {
          job_name: {
            contains: keyword,
          },
        },
      });
      return {
        status: 200,
        data: data,
        message: 'Successfull!',
      };
    } catch (error) {
      return { status: 500, message: `${error}` };
    }
  }

  // GET JOB BY ID (RUN)
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
      return { status: 500, message: `${error}` };
    }
  }

  // PUT JOB BY ID
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

  // // DELETE JOB BY ID (NO RUN)
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

  // GET JOB BY MENU DETAIL JOB (RUN)
  async getMenuJobType(): Promise<any> {
    try {
      const data = await this.prisma.jobType.findMany({
        include: {
          JobDetailType: true,
        },
      });

      if (!data || data.length === 0) {
        return { status: 404, message: 'Menu job type not found' };
      }

      return {
        status: 200,
        data: data,
        message: 'Successfull!',
      };
    } catch (error) {
      return { status: 500, message: `${error}` };
    }
  }

  // GET JOB TYPE BY ID (RUN)
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
      return { status: 500, message: `${error}` };
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

  async getListJobByName(name_job: string): Promise<any> {}
}
