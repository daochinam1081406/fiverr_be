import { Controller, Get, Post, Body, Param, Delete, Put, Query, UseGuards } from '@nestjs/common';
import { JobTypeService } from './job-type.service';
import { CreateJobTypeDto } from './dto/create-job-type.dto';
import { UpdateJobTypeDto } from './dto/update-job-type.dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuards } from 'src/strategy/role.stratey';

@ApiTags('JobType')
@Controller('/api/job-type')
export class JobTypeController {
  constructor(private readonly jobTypeService: JobTypeService) {}

  @Get()
  async findAll(): Promise<any> {
    try {
      return await this.jobTypeService.findAll();
    } catch (error) {
      throw error;
    }
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"), RoleGuards) 
  @Post()
  async create(@Body() createJobTypeDto: CreateJobTypeDto): Promise<string> {
    try {
      return await this.jobTypeService.create(createJobTypeDto);
    } catch (error) {
      throw error;
    }
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt")) 
  @ApiQuery({name: "keyword", required: true, description:"filter name"})
  @ApiQuery({name: "size", required: true, description: "number item one page"})
  @ApiQuery({name: "page", required: true, description: "page number"})
  @Get('/pagination-search')
  async findwidthpage(@Query("size") size ,@Query("page") page , @Query("keyword") keyword): Promise<any> {
    try {
      let numPage = Number(page);
      let numSize = Number(size);
      let skip = (numPage - 1) * numSize;
      return await this.jobTypeService.findWidthPage(skip, numSize, keyword);
    } catch (error) {
      throw error;
    }
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt")) 
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<string> {
    try {
      return await this.jobTypeService.findOne(+id);
    } catch (error) {
      throw error;
    }
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"), RoleGuards) 
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateJobTypeDto: UpdateJobTypeDto): Promise<string> {
    try {
      return await this.jobTypeService.update(+id, updateJobTypeDto);
    } catch (error) {
      throw error;
    }
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"), RoleGuards) 
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<string> {
    try {
      return await this.jobTypeService.remove(+id);
    } catch (error) {
      throw error;
    }
  }
}
