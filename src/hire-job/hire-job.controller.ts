import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  UseGuards,
  Req,
} from '@nestjs/common';
import { HireJobService } from './hire-job.service';
import { CreateHireJobDto } from './dto/create-hire-job.dto';
import { UpdateHireJobDto } from './dto/update-hire-job.dto';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuards } from 'src/strategy/role.stratey';

@ApiTags('HireJob')
@Controller('/api/hire-job')
export class HireJobController {
  constructor(private readonly hireJobService: HireJobService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiBody({ type: CreateHireJobDto })
  @Post('/create-hire-job')
  create(@Body() createHireJobDto: CreateHireJobDto): Promise<string> {
    return this.hireJobService.create(createHireJobDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiBody({ type: UpdateHireJobDto })
  @ApiParam({ name: 'id', required: true, description: 'id' })
  @Put('/update-hire-job/:id')
  update(
    @Body() body: UpdateHireJobDto,
    @Param('id') id: string,
  ): Promise<string> {
    return this.hireJobService.update(body, +id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll() {
    return this.hireJobService.findAll();
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('/get-list-hire-jonb')
  findAllByUserID(@Req() req) {
    let id = req.user.user_id;
    return this.hireJobService.findAllByUserID(+id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiParam({ name: 'page', required: true, description: 'page number' })
  @ApiParam({ name: 'size', required: true, description: 'page size' })
  @Get('/:page/:size')
  hireJobPagination(@Param('page') page, @Param('size') size): Promise<any> {
    let numPage = page * 1;
    let numSize = size * 1;
    let skip = (numPage - 1) * size;
    return this.hireJobService.hireJobPagination(skip, numSize);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiParam({ name: 'id', required: true, description: 'id' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hireJobService.findOne(+id);
  }

  @ApiBearerAuth()
  @UseGuards(RoleGuards)
  @UseGuards(AuthGuard('jwt'))
  @ApiParam({ name: 'id', required: true, description: 'id' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hireJobService.remove(+id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiParam({
    name: 'job_id',
    required: true,
    description: 'job id',
  })
  @Post('/completed-job/:hire_job_id')
  completedJob(@Param('hire_job_id') hire_job_id: string) {
    return this.hireJobService.completedJob(+hire_job_id);
  }
}
