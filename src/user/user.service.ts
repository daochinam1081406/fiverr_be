import { Delete, Get, Injectable, Post, Put } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import {
  ApiBearerAuth,
  ApiBody,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { DeleteUserDTO, PostUserDTO } from './dto/user.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  private prisma = new PrismaClient();

  constructor() {
    this.prisma = new PrismaClient();
  }

  async getUser(): Promise<any> {
    const data = await this.prisma.users.findMany();
    return data;
  }

  async postUser(body: PostUserDTO): Promise<any> {
    try {
      const {
        user_name,
        avatar,
        email,
        pass_word,
        phone,
        birth_day,
        gender,
        role,
        skill,
        certification,
      } = body;
      const checkUserDB = await this.prisma.users.findFirst({
        where: { email },
      });
      if (checkUserDB) {
        return {
          status: 400,
          message: 'User already exists !',
        };
      } else {
        const newUser = {
          user_name,
          avatar,
          email,
          pass_word,
          phone,
          birth_day,
          gender,
          role,
          skill: skill || [],
          certification: certification || [],
        };
        // await this.prisma.users.create({ data: newUser });
        return {
          status: 201,
          message: 'The user has been created successfully !',
        };
      }
    } catch (error) {
      return { status: 500, message: `${error}` };
    }
  }

  async deleteUser(user_id: number): Promise<any> {
    try {
      const checkUserDB = await this.prisma.users.findFirst({
        where: { user_id },
      });

      if (!checkUserDB) {
        return {
          status: 404,
          message: 'User not found',
        };
      }

      await this.prisma.users.delete({
        where: { user_id },
      });

      return {
        status: 200,
        message: 'Delete user successfully',
      };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientValidationError) {
        return {
          status: 400,
          message: 'Invalid data provided',
        };
      }

      return {
        status: 500,
        message: `Error deleting user: ${error.message}`,
      };
    }
  }

  async paginationSearchUser(
    Skip: number,
    Size: number,
    keyword: string,
  ): Promise<any> {
    const data = await this.prisma.users.findMany({
      where: {
        OR: [
          {
            user_name: {
              contains: keyword,
            },
          },
        ],
      },
      skip: Skip,
      take: Size,
    });
    return data;
  }

  async getUserById(user_id: number): Promise<any> {
    const user = await this.prisma.users.findFirst({
      where: {
        user_id,
      },
    });

    if (!user) {
    }
    return user;
  }

  @Put()
  async putUser() {}

  @Get()
  async getSearchUserByName() {}

  @Post()
  async uploadAvatar() {}
}
