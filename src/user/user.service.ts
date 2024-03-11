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

  // GET USER
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

  // GET USER BY ID
  async getUserById(user_id: number): Promise<any> {
    const user = await this.prisma.users.findFirst({
      where: {
        user_id,
      },
    });

    if (!user) {
      return { status: 400, message: 'User does not exist!' };
    }
    return user;
  }

  // PUT USER BY ID
  async putUserById(body: UserDTO): Promise<any> {
    try {
      const { user_id } = body;
      const {
        user_name,
        email,
        avatar,
        birth_day,
        certification,
        gender,
        pass_word,
        phone,
        role,
        skill,
      } = body;
      const user = await this.prisma.users.findFirst({
        where: {
          user_id,
        },
      });

      if (user) {
        const newData = {
          user_name: user_name,
          email: email,
          pass_word: pass_word,
          avatar: avatar,
          birth_day: birth_day,
          gender: gender,
          phone: phone,
          role: role,
          skill: skill || [],
          certification: certification || [],
        };
        //  await this.prisma.users.update({
        //   where: {
        //     user_id: 1
        //   },
        //   data: newData
        //  });
        return {
          status: 201,
          message: 'Update user successfull!',
        };
      }

      if (!user) {
        return { status: 400, message: 'User does not exist!' };
      }
    } catch (error) {
      return { status: 500, message: `${error}` };
    }
  }

  // SEARCH USER BY NAME
  async getSearchUserByName(user_name: string): Promise<any> {
    try {
      const data = await this.prisma.users.findMany({
        where: {
          user_name: {
            contains: user_name,
          },
        },
      });
      return { status: 200, message: 'Successfull!', data: data };
    } catch (error) {
      return { status: 500, message: `${error}` };
    }
  }

  // UPLOAD AVATAR
  async uploadAvatar() {}
}
