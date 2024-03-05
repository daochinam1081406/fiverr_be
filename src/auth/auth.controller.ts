import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDTO, AuthSignUpDTO } from './dto/login.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // LOGIN
  @Post('/login')
  @ApiBody({ type: AuthLoginDTO })
  async login(@Body() body: AuthLoginDTO, @Res() response): Promise<any> {
    const data = await this.authService.login(body);
    response.status(data.status).json(data);
  }

  // SIGN-UP
  @ApiBody({ type: AuthSignUpDTO })
  @Post('/sign-up')
  async signUp(@Body() body: AuthSignUpDTO, @Res() response): Promise<any> {
    const data = await this.authService.signUp(body);
    response.status(data.status).json(data);
  }
}
