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
  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt")) 
  @Get()
  findAll() : Promise<any> {
    return this.jobTypeService.findAll();
  }
  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"),RoleGuards) 
  @Post()
  create(@Body() createJobTypeDto: CreateJobTypeDto) : Promise<string> {
    return this.jobTypeService.create(createJobTypeDto);
  }
  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt")) 
  @ApiQuery({name: "keyword", required: true, description:"filter name"})
  @ApiQuery({name: "size", required: true, description: "number item one page"})
  @ApiQuery({name: "page", required: true, description: "page number"})
  @Get('/pagination-search')
  findwidthpage(@Query("size") size ,@Query("page") page , @Query("keyword") keyword) : Promise<any> {
    let numPage = Number(page);
    let numSize = Number(size);
    let skip = (numPage - 1) * numSize;
    return this.jobTypeService.findWidthPage(skip, numSize, keyword);
  }
  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt")) 
  @Get(':id')
  findOne(@Param('id') id: string) : Promise<string> {
    return this.jobTypeService.findOne(+id);
  }
  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"),RoleGuards) 
  @Put(':id')
  update(@Param('id') id: string, @Body() updateJobTypeDto: UpdateJobTypeDto) : Promise<string> {
    return this.jobTypeService.update(+id, updateJobTypeDto);
  }
  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"),RoleGuards) 
  @Delete(':id')
  remove(@Param('id') id: string) : Promise<string>{
    return this.jobTypeService.remove(+id);
  }
}
