import { Injectable } from '@nestjs/common';
import { CreateHireJobDto } from './dto/create-hire-job.dto';
import { UpdateHireJobDto } from './dto/update-hire-job.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class HireJobService {
  prisma = new PrismaClient();

  async create(createHireJobDto: CreateHireJobDto): Promise<string> {
    let newData = { ...createHireJobDto };
    await this.prisma.hireJob.create({
      data: newData,
    });
    return 'Cteate successfully!';
  }

  async update(body: UpdateHireJobDto, hire_job_id: number): Promise<string> {
    let updateHireJob = { ...body };
    await this.prisma.hireJob.update({
      where: {
        hire_job_id: hire_job_id,
      },
      data: updateHireJob,
    });

    return `Update successfully! `;
  }

  async findAll() {
    let data = this.prisma.hireJob.findMany();
    return data;
  }

  async findAllByUserID(id: number) {
    let data = await this.prisma.hireJob.findMany({
      where: {
        employer_id: id,
      },
    });
    return data;
  }

  async hireJobPagination(skip: number, numSize: number): Promise<any> {
    let data = await this.prisma.hireJob.findMany({
      skip: skip,
      take: numSize,
    });
    return data;
  }
  async findOne(id: number): Promise<any> {
    let data = await this.prisma.hireJob.findMany({
      where: {
        hire_job_id: id,
      },
    });
    return data;
  }

  async remove(id: number): Promise<string> {
    await this.prisma.hireJob.delete({
      where: {
        hire_job_id: id,
      },
    });

    return `delete successfully! `;
  }
  async completedJob(hire_job_id: number): Promise<string> {
    let newData = { completed: true };
    await this.prisma.hireJob.update({
      where: {
        hire_job_id: hire_job_id,
      },
      data: newData,
    });

    return `Job completed`;
  }
}
