import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateHireJobDto } from './dto/create-hire-job.dto';
import { UpdateHireJobDto } from './dto/update-hire-job.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class HireJobService {
  prisma = new PrismaClient();

  async create(createHireJobDto: CreateHireJobDto): Promise<string> {
    try {
      let newData = { ...createHireJobDto };
      await this.prisma.hireJob.create({
        data: newData,
      });
      return 'Created successfully!';
    } catch (error) {
      throw new NotFoundException('Failed to create hire job.');
    }
  }

  async update(body: UpdateHireJobDto, hire_job_id: number): Promise<string> {
    try {
      let updateHireJob = { ...body };
      await this.prisma.hireJob.update({
        where: {
          hire_job_id: hire_job_id,
        },
        data: updateHireJob,
      });
      return 'Updated successfully!';
    } catch (error) {
      throw new NotFoundException('Failed to update hire job.');
    }
  }

  async findAll(): Promise<any> {
    try {
      let data = await this.prisma.hireJob.findMany();
      return data;
    } catch (error) {
      throw new NotFoundException('Failed to find hire jobs.');
    }
  }

  async findAllByUserID(userId: number): Promise<any> {
    try {
      const data = await this.prisma.hireJob.findMany({
        where: {
          employer_id: userId,
        },
      });
      return data;
    } catch (error) {
      throw new NotFoundException('Failed to find hire jobs by user ID.');
    }
  }
  async findWidthPage(skip: number, numSize: number, keyword: string): Promise<any> {
    try {
      if (isNaN(skip) || isNaN(numSize) || !keyword) {
        return { error: 'Please input valid parameters' };
      }

      const data = await this.prisma.hireJob.findMany({
        where: {
          Job: {
            job_name: {
              contains: keyword,
            },
          },
        },
        include: {
          Job: true,
        },
        skip: skip,
        take: numSize,
      });

      return data;
    } catch (error) {
      throw new NotFoundException('Failed to find hire jobs with pagination.');
    }
  }

  async findOne(id: number): Promise<any> {
    try {
      let data = await this.prisma.hireJob.findMany({
        where: {
          hire_job_id: id,
        },
      });
      return data;
    } catch (error) {
      throw new NotFoundException('Failed to find hire job.');
    }
  }

  async remove(id: number): Promise<string> {
    try {
      await this.prisma.hireJob.delete({
        where: {
          hire_job_id: id,
        },
      });
      return 'Deleted successfully!';
    } catch (error) {
      throw new NotFoundException('Failed to delete hire job.');
    }
  }

  async completedJob(hire_job_id: number): Promise<string> {
    try {
      let newData = { completed: true };
      await this.prisma.hireJob.update({
        where: {
          hire_job_id: hire_job_id,
        },
        data: newData,
      });
      return 'Job completed';
    } catch (error) {
      throw new NotFoundException('Failed to mark job as completed.');
    }
  }
}
