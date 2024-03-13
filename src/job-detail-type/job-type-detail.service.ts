import { Injectable } from '@nestjs/common';
import { CreateJobTypeDetailDto } from './dto/create-job-type-detail.dto';
import { UpdateJobTypeDetailDto } from './dto/update-job-type-detail.dto';
import { PrismaClient } from '@prisma/client';
import * as moment from 'moment';

@Injectable()
export class JobTypeDetailService {
  prisma = new PrismaClient()

  async findAll() {
  
    const data = {
      content: {       
      },
      dateTime: moment().format('YYYY-MM-DD HH:mm:ss')
  };
  return data
  }

  async create(createJobTypeDetailDto: CreateJobTypeDetailDto) :Promise<string> {
    let newTypeDetail= { ...createJobTypeDetailDto };
    await this.prisma.jobDetailType.create({
      data: newTypeDetail
    })
    return `Created Success`
  }
  async findWidthPage (skip: number, numSize: number, keyword: string): Promise<any> {
   
    const data = {
      content: {
      },
      dateTime: moment().format('YYYY-MM-DD HH:mm:ss')

  };
  return data
  }

 async findOne(job_detail_type_id: number) : Promise<any>{
 

   const data = {
      content: {
      },
      dateTime: moment().format('YYYY-MM-DD HH:mm:ss')

  };
  return data
  }

  async upload(filename: string ,job_detail_type_id: number,updateJobTypeDetailDto: UpdateJobTypeDetailDto) : Promise<string> {
    let upload = { ...updateJobTypeDetailDto};
    upload.image = filename;
    await this.prisma.jobDetailType.update({
      where: {
        job_detail_type_id: job_detail_type_id
      },
      data: upload

    });
    return `Upload Image success !`
  }

 async update(job_detail_type_id: number, updateJobTypeDetailDto: UpdateJobTypeDetailDto) : Promise<string> {
    let updateTypeDetail = { ...updateJobTypeDetailDto};
    await this.prisma.jobDetailType.update({
      where: {
        job_detail_type_id: job_detail_type_id
      },
      data: updateTypeDetail
    });
    return `update success!`
  }

  async remove(job_detail_type_id: number) : Promise<string> {
    await this.prisma.jobDetailType.delete({
      where: {
        job_detail_type_id: job_detail_type_id
      }
    });
    return `delete  suscessfull! `;
  }

 

  
}
