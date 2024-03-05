import { Delete, Get, Injectable, Post, Put } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import {
  ApiBearerAuth,
  ApiBody,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

@Injectable()
export class UserService {
  private prisma = new PrismaClient();

  constructor() {
    this.prisma = new PrismaClient();
  }

  @Get()
  async getUser(): Promise<any> {
    const data = await this.prisma.users.findMany();
    return data;
  }

  @ApiBody({})
  @Post()
  async postUser(): Promise<any> {}

  @ApiQuery({})
  @Delete('')
  async deleteUser() {}

  @ApiQuery({})
  @ApiQuery({})
  @ApiQuery({})
  @Get()
  async paginationSearchUser() {}

  @Get()
  async getUserById() {}

  @Put()
  async putUser() {}

  @Get()
  async getSearchUserByName() {}

  @Post()
  async uploadAvatar() {}
}
