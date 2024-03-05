import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';

// import { FileInterceptor } from '@nestjs/platform-express';
// import { diskStorage } from 'multer';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUser(): Promise<any> {
    return this.userService.getUser();
  }

  @Post('')
  async postUser() {}

  @Delete('')
  async deleteUser() {}

  @Get('/pagination-search-user')
  async paginationSearchUser() {}

  @Get('/:id')
  async getUserById() {}

  @Put('/:id')
  async putUser() {}

  @Get('/search/:user_name')
  async getSearchUserByName() {}

  @Post('/upload-avatar')
  async uploadAvatar() {}
  // @Post('/upload')
  // @UseInterceptors(
  //   FileInterceptor('file', {
  //     storage: diskStorage({
  //       destination: process.cwd() + '/public/img',
  //       filename: (req, file, callback) => {
  //         callback(null, new Date().getTime() + `${file.originalname}`);
  //       },
  //     }),
  //   }),
  // )
}
