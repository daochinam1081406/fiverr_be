import { Controller, Get, Post, Body, Param, Delete, Query, Put, UploadedFile, UseInterceptors, UseGuards } from '@nestjs/common';
import { JobTypeDetailService } from './job-type-detail.service';
import { CreateJobTypeDetailDto } from './dto/create-job-type-detail.dto';
import { UpdateJobTypeDetailDto } from './dto/update-job-type-detail.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuards } from 'src/strategy/role.stratey';

@ApiTags('JobTypeDetail')
@Controller('/api/job-type-detail')
export class JobTypeDetailController {
  constructor(private readonly jobTypeDetailService: JobTypeDetailService) { }


  @Get()
  async findAll(): Promise<any> {
    try {
      return await this.jobTypeDetailService.findAll();
    } catch (error) {
      throw error;
    }
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"), RoleGuards)
  @Post()
  async create(@Body() createJobTypeDetailDto: CreateJobTypeDetailDto): Promise<string> {
    try {
      return await this.jobTypeDetailService.create(createJobTypeDetailDto);
    } catch (error) {
      throw error;
    }
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @ApiQuery({ name: "keyword", required: true, description: "filter name" })
  @ApiQuery({ name: "size", required: true, description: "number item in page" })
  @ApiQuery({ name: "page", required: true, description: "page number" })
  @Get('/pagination-search')
  async findwidthpage(@Query("size") size, @Query("page") page, @Query("keyword") keyword): Promise<any> {
    try {
      let numPage = Number(page);
      let numSize = Number(size);
      let skip = (numPage - 1) * numSize;
      return await this.jobTypeDetailService.findWidthPage(skip, numSize, keyword);
    } catch (error) {
      throw error;
    }
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<any> {
    try {
      return await this.jobTypeDetailService.findOne(+id);
    } catch (error) {
      throw error;
    }
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"), RoleGuards)
  @ApiParam({ name: "id", required: true, description: "id job type detail" })
  @Post("/upload-image-job-type-detail/:id")
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Upload a file',
    type: 'multipart/form-data',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor("file", {
    storage: diskStorage({
      destination: process.cwd() + "/public/img",
      filename: (req, file, callback) => {
        callback(null, new Date().getTime() + `${file.originalname}`)
      }
    })
  }))
  async upload(@UploadedFile("file") file, @Param('id') id: number, @Body() updateJobTypeDetailDto: UpdateJobTypeDetailDto): Promise<string> {
    try {
      return await this.jobTypeDetailService.upload(file.filename, +id, updateJobTypeDetailDto);
    } catch (error) {
      throw error;
    }
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"), RoleGuards)
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateJobTypeDetailDto: UpdateJobTypeDetailDto): Promise<string> {
    try {
      return await this.jobTypeDetailService.update(+id, updateJobTypeDetailDto);
    } catch (error) {
      throw error;
    }
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"), RoleGuards)
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<string> {
    try {
      return await this.jobTypeDetailService.remove(+id);
    } catch (error) {
      throw error;
    }
  }
}
