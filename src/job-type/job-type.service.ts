import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateJobTypeDto } from './dto/create-job-type.dto';
import { UpdateJobTypeDto } from './dto/update-job-type.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class JobTypeService {
  prisma = new PrismaClient()

  async findAll(): Promise<any> {
    try {
      let data = await this.prisma.jobType.findMany({});
      return data;
    } catch (error) {
      throw new NotFoundException('Failed to retrieve job types.');
    }
  }

  async create(createJobTypeDto: CreateJobTypeDto): Promise<string> {
    try {
      let newType = { ...createJobTypeDto };
      await this.prisma.jobType.create({
        data: newType
      });
      return `Created success`;
    } catch (error) {
      throw new NotFoundException('Failed to create job type.');
    }
  }

  async findWidthPage(skip: number, numSize: number, keyword: string): Promise<any> {
    try {
      let data = await this.prisma.jobType.findMany({
        where: {
          type_name: {
            contains: keyword
          }
        },
        skip: skip,
        take: numSize,
      });
      return data;
    } catch (error) {
      throw new NotFoundException('Failed to find job types with pagination.');
    }
  }

  async findOne(job_type_id: number): Promise<any> {
    try {
      let data = await this.prisma.jobType.findMany({
        where: {
          job_type_id: job_type_id
        }
      });
      return data;
    } catch (error) {
      throw new NotFoundException('Failed to find job type.');
    }
  }

  async update(job_type_id: number, updateJobTypeDto: UpdateJobTypeDto): Promise<string> {
    try {
      let updateType = { ...updateJobTypeDto};
      await this.prisma.jobType.update({
        where: {
          job_type_id: job_type_id
        },
        data: updateType
      });
      return `Updated sucess`;
    } catch (error) {
      throw new NotFoundException('Failed to update job type.');
    }
  }

  async remove(job_type_id: number): Promise<any> {
    try {
      await this.prisma.jobType.delete({
        where: {
          job_type_id: job_type_id
        }
      });
      return `Deleted success`;
    } catch (error) {
      throw new NotFoundException('Failed to delete job type.');
    }
  }
}
