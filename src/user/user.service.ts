import { Delete, Get, Injectable, Post, Put } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { DeleteUserDTO, UserDTO } from './dto/user.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  private prisma = new PrismaClient();

  constructor() {
    this.prisma = new PrismaClient();
  }

  // GET USER
  async getUser(): Promise<any> {
    try {
      const data = await this.prisma.users.findMany();
      return { data: data, status: 200, message: 'Get user successfull!' };
    } catch (error) {
      return { status: 500, message: `${error}` };
    }
  }

  // POST USER
  async postUser(body: UserDTO): Promise<any> {
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

  // DELETE USER
  async deleteUser(user_id: number): Promise<any> {
    try {
      const checkUserDB = await this.prisma.users.findFirst({
        where: { user_id },
      });

      if (!checkUserDB) {
        return {
          status: 404,
          message: 'User already exists !',
        };
      }

      await this.prisma.users.delete({
        where: { user_id },
      });

      return {
        status: 200,
        message: 'Delete user successfully !',
      };
    } catch (error) {
      return {
        status: 500,
        message: `Error deleting user: ${error.message}`,
      };
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
        // await this.prisma.users.update(newData);
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

  @Post()
  async uploadAvatar() {}
}
