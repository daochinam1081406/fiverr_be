import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { UserDTO } from './dto/user.dto';
import { UserResponse } from './entities/user.response';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  private prisma = new PrismaClient();

  constructor() {
    this.prisma = new PrismaClient();
  }

  async getUser(): Promise<UserResponse> {
    try {
      const data: UserEntity[] = await this.prisma.users.findMany();
      return { statusCode: 200, content: data, message: 'Get user success!' };
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Internal server error',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // POST USER
  async postUser(body: UserDTO): Promise<UserResponse> {
    try {
      const {
        user_id,
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
        throw new HttpException('User already exists!', HttpStatus.BAD_REQUEST);
      } else {
        const newUser: UserEntity = await this.prisma.users.create({
          data: {
            user_id,
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
          },
        });
        return {
          statusCode: 201,
          content: [newUser],
          message: 'User created successfully!',
        };
      }
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Internal server error',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // DELETE USER
  async deleteUser(user_id: number): Promise<any> {
    try {
      const checkUserDB = await this.prisma.users.findUnique({
        where: { user_id },
      });

      if (!checkUserDB) {
        throw new HttpException('User not found!', HttpStatus.NOT_FOUND);
      }

      await this.prisma.users.delete({
        where: { user_id },
      });

      return {
        status: HttpStatus.OK,
        message: 'Delete user successfully',
      };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: `Error deleting user: ${error.message}`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // PAGINATION PAGE AND SEARCH USER
  async paginationSearchUser(
    pageIndex: number,
    pageSize: number,
    keyword: string,
  ): Promise<UserResponse> {
    try {
      const skip = (pageIndex - 1) * pageSize;
      const data: UserEntity[] = await this.prisma.users.findMany({
        skip: skip,
        take: Number(pageSize),
        where: {
          user_name: {
            contains: keyword,
          },
        },
      });

      if (!data || data.length === 0) {
        throw new HttpException('No users found', HttpStatus.NOT_FOUND);
      }

      return {
        statusCode: HttpStatus.OK,
        content: data,
        message: 'Successfully retrieved users with pagination and search!',
      };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: `Error retrieving users: ${error.message}`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // GET USER BY ID
  async getUserById(user_id: number): Promise<UserResponse> {
    try {
      const user = await this.prisma.users.findFirst({
        where: {
          user_id,
        },
      });

      if (!user) {
        return { statusCode: 404, message: 'User not found', content: [] };
      }

      return {
        statusCode: 200,
        message: 'User found',
        content: [user],
      };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: `Error retrieving users: ${error.message}`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // PUT USER BY ID
  async putUserById(user_id: number, body: UserDTO): Promise<UserResponse> {
    try {
      const user = await this.prisma.users.findFirst({
        where: {
          user_id: Number(user_id),
        },
      });

      if (!user) {
        return { statusCode: 404, message: 'User not found!', content: [] };
      }

      const updatedUser = await this.prisma.users.update({
        where: {
          user_id: Number(user_id),
        },
        data: {
          user_name: body.user_name,
          email: body.email,
          pass_word: body.pass_word,
          avatar: body.avatar,
          birth_day: body.birth_day ? new Date(body.birth_day) : user.birth_day,
          gender: body.gender,
          phone: body.phone,
          role: body.role,
          skill: body.skill,
          certification: body.certification,
        },
      });

      return {
        statusCode: 200,
        message: 'Update user successfully!',
        content: [updatedUser],
      };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: `Error updating user: ${error.message}`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // SEARCH USER BY NAME
  async getSearchUserByName(user_name: string): Promise<UserResponse> {
    try {
      const data = await this.prisma.users.findMany({
        where: {
          user_name: {
            contains: user_name,
          },
        },
      });
      return { statusCode: 200, message: 'Successful!', content: data };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: `Error retrieving users: ${error.message}`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // UPLOAD AVATAR
  async uploadAvatar() {}
}
