import { Injectable } from '@nestjs/common';
import { AuthLoginDTO, AuthSignUpDTO } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}
  prisma = new PrismaClient();
  async login(body: AuthLoginDTO): Promise<any> {
    try {
      let { email, pass_word } = body;
      let checkEmail = await this.prisma.users.findFirst({
        where: {
          email: email,
        },
      });

      if (checkEmail) {
        let isCorrectPass = bcrypt.compareSync(pass_word, checkEmail.pass_word);
        if (isCorrectPass) {
          let payload = {
            user_id: checkEmail.user_id,
            email: checkEmail.email,
            role: checkEmail.role,
          };
          let token = this.jwtService.sign(payload, {
            secret: this.configService.get('SECRET_KEY'),
            expiresIn: this.configService.get('EXPIRES_IN'),
          });

          return {
            status: 200,
            message: 'Login successfully!',
            token: token,
          };
        } else {
          return {
            status: 400,
            message: 'Password incorrect!',
          };
        }
      } else {
        return {
          status: 400,
          message: 'Email does not exist',
        };
      }
    } catch (error) {
      console.log(error + '123');
      return {
        status: 500,
        message: error,
      };
    }
  }

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
        let encodePass = bcrypt.hashSync(pass_word, 2);
        let newUser = {
          ...body,
          role: 'user',
          pass_word: encodePass,
        };

        await this.prisma.users.create({ data: newUser });
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
