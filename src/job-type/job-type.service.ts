import { Injectable } from '@nestjs/common';
import { CreateJobTypeDto } from './dto/create-job-type.dto';
import { UpdateJobTypeDto } from './dto/update-job-type.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class JobTypeService {
  prisma = new PrismaClient()
  

 
  async findAll(): Promise<any> {
    let data = await this.prisma.jobType.findMany({
    });

    return data;
  }

  async create(createJobTypeDto: CreateJobTypeDto): Promise<string> {
    let newType = { ...createJobTypeDto };
    await this.prisma.jobType.create({
      data: newType
    })
    return `Created new type`
  }

  async findWidthPage (skip: number, numSize: number, keyword: string): Promise<any> {
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
  }

  async findOne(job_type_id: number): Promise<any> {
    let data = await this.prisma.jobType.findMany({

      where: {
        job_type_id: job_type_id
      }
    });
    return data;
  }

  async update(job_type_id: number, updateJobTypeDto: UpdateJobTypeDto): Promise<string> {
    let updateType = { ...updateJobTypeDto};
    await this.prisma.jobType.update({
      where: {
        job_type_id: job_type_id
      },
      data: updateType
    });
    return `updated type!`
  }

  async remove(job_type_id: number): Promise<any> {
    await this.prisma.jobType.delete({
      where: {
        job_type_id: job_type_id
      }
    });

    return `deleted type! `;
  }
}
