import { Injectable } from '@nestjs/common';
import { AuthLoginDTO, AuthSignUpDTO } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private jwtService: JwtService;
  private configService: ConfigService;

  private prisma = new PrismaClient();

  constructor() {
    this.prisma = new PrismaClient();
  }
  // LOGIN
  async login(body: AuthLoginDTO): Promise<any> {
    try {
      const { email, pass_word } = body;

      const checkUserDB = await this.prisma.users.findFirst({
        where: { email: email },
      });

      if (checkUserDB) {
        const isCorrectPass = bcrypt.compareSync(
          pass_word,
          checkUserDB.pass_word,
        );

        if (isCorrectPass) {
          const payload = {
            user: checkUserDB.user_id,
            email: checkUserDB.email,
            role: checkUserDB.role,
          };

          const token = this.jwtService.sign(payload, {
            secret: this.configService.get('SECRET_KEY'),
            expiresIn: this.configService.get('EXPIRES_IN'),
          });
          return { status: 200, token: token };
        }
        return { status: 400, message: 'Incorrect password, please re-enter!' };
      }
    } catch (error) {
      return { status: 500, message: `User is not exist! ${error}` };
    }
  }

  // SIGN-UP
  async signUp(body: AuthSignUpDTO): Promise<any> {
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
        where: { email: email },
      });

      if (checkUserDB) {
        return { status: 400, message: 'User already exists!' };
      } else {
        const enCodePassword = bcrypt.hashSync(pass_word, 10);
        const newUser = {
          user_name,
          email,
          pass_word: enCodePassword,
          phone,
          birth_day,
          gender,
          role,
          skill,
          certification,
        };
        // await this.prisma.users.create({ data: newUser });
        return { status: 201, message: 'User signed up successfully!' };
      }
    } catch (error) {
      return {
        status: 500,
        message: `Failed to sign up user: ${error.message}`,
      };
    }
  }
}
