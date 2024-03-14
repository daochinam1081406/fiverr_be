import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateJobTypeDetailDto } from './dto/create-job-type-detail.dto';
import { UpdateJobTypeDetailDto } from './dto/update-job-type-detail.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class JobTypeDetailService {
  prisma = new PrismaClient();

  async findAll(): Promise<any> {
    try {
      let data = await this.prisma.jobDetailType.findMany({});
      return data;
    } catch (error) {
      throw new NotFoundException('Failed to retrieve job detail types.');
    }
  }

  async create(
    createJobTypeDetailDto: CreateJobTypeDetailDto,
  ): Promise<string> {
    try {
      let newTypeDetail = { ...createJobTypeDetailDto };
      await this.prisma.jobDetailType.create({
        data: newTypeDetail,
      });
      return ' Created Success';
    } catch (error) {
      throw new NotFoundException('Failed to create job detail type.');
    }
  }

  async findWidthPage(
    skip: number,
    numSize: number,
    keyword: string,
  ): Promise<any> {
    try {
      if (isNaN(skip) || isNaN(numSize) || !keyword) {
        return { error: 'Please input param' };
      }
      let data = await this.prisma.jobDetailType.findMany({
        where: {
          detail_name: {
            contains: keyword,
          },
        },
        skip: skip,
        take: numSize,
      });
      return data;
    } catch (error) {
      throw new NotFoundException(
        'Failed to find job detail types with pagination.',
      );
    }
  }

  async findOne(job_detail_type_id: number): Promise<any> {
    try {
      let data = await this.prisma.jobDetailType.findMany({
        where: {
          job_detail_type_id: job_detail_type_id,
        },
      });
      return data;
    } catch (error) {
      throw new NotFoundException('Failed to find job detail type.');
    }
  }

  async upload(
    filename: string,
    job_detail_type_id: number,
    updateJobTypeDetailDto: UpdateJobTypeDetailDto,
  ): Promise<string> {
    try {
      let upload = { ...updateJobTypeDetailDto };
      upload.image = filename;
      await this.prisma.jobDetailType.update({
        where: {
          job_detail_type_id: job_detail_type_id,
        },
        data: upload,
      });
      return 'Upload Image success'!;
    } catch (error) {
      throw new NotFoundException(
        'Failed to upload image for job detail type.',
      );
    }
  }

  async update(
    job_detail_type_id: number,
    updateJobTypeDetailDto: UpdateJobTypeDetailDto,
  ): Promise<string> {
    try {
      let updateTypeDetail = { ...updateJobTypeDetailDto };
      await this.prisma.jobDetailType.update({
        where: {
          job_detail_type_id: job_detail_type_id,
        },
        data: updateTypeDetail,
      });
      return 'update success!';
    } catch (error) {
      throw new NotFoundException('Failed to update job detail type.');
    }
  }

  async remove(job_detail_type_id: number): Promise<string> {
    try {
      await this.prisma.jobDetailType.delete({
        where: {
          job_detail_type_id: job_detail_type_id,
        },
      });
      return 'delete  suscessfull!';
    } catch (error) {
      throw new NotFoundException('Failed to delete job detail type.');
    }
  }
}
