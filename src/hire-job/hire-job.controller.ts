import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import { HireJobService } from './hire-job.service';
import { CreateHireJobDto } from './dto/create-hire-job.dto';
import { UpdateHireJobDto } from './dto/update-hire-job.dto';
import { ApiBearerAuth, ApiBody, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuards } from 'src/strategy/role.stratey';

@ApiTags('HireJob')
@Controller('/api/hire-job')
export class HireJobController {
  constructor(private readonly hireJobService: HireJobService) {}


  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll() {
    try {
      return await this.hireJobService.findAll();
    } catch (error) {
      throw error;
    }
  }
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('/create-hire-job')
  @ApiBody({ type: CreateHireJobDto })
  async create(@Body() createHireJobDto: CreateHireJobDto): Promise<string> {
    try {
      return await this.hireJobService.create(createHireJobDto);
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
      return await this.hireJobService.findWidthPage(skip, numSize, keyword);
    } catch (error) {
      throw error;
    }
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('/:id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.hireJobService.findOne(+id);
    } catch (error) {
      throw error;
    }
  }
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('/get-hire-job-by-user/:user_id')
  async findAllByUserID(@Param('user_id') userId: string) {
    try {
      return await this.hireJobService.findAllByUserID(+userId);
    } catch (error) {
      throw error;
    }
  }



  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Put('/update-hire-job/:id')
  @ApiParam({ name: 'id', required: true, description: 'id' })
  @ApiBody({ type: UpdateHireJobDto })
  async update(
    @Body() body: UpdateHireJobDto,
    @Param('id') id: string,
  ): Promise<string> {
    try {
      return await this.hireJobService.update(body, +id);
    } catch (error) {
      throw error;
    }
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), RoleGuards)
  @Delete('/:id')
  @ApiParam({ name: 'id', required: true, description: 'id' })
  async remove(@Param('id') id: string) {
    try {
      return await this.hireJobService.remove(+id);
    } catch (error) {
      throw error;
    }
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('/completed-job/:hire_job_id')
  @ApiParam({ name: 'hire_job_id', required: true, description: 'hire job id' })
  async completedJob(@Param('hire_job_id') hire_job_id: string) {
    try {
      return await this.hireJobService.completedJob(+hire_job_id);
    } catch (error) {
      throw error;
    }
  }
}
