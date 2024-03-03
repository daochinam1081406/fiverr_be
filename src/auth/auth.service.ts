import { Injectable } from '@nestjs/common';
import { AuthLoginDTO } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private jwtService: JwtService;
  private configService: ConfigService;

  prisma = new PrismaClient();

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
}
