import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
  UseInterceptors,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  ApiTags,
  ApiBody,
  ApiQuery,
  ApiParam,
  ApiConsumes,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { UserDTO } from './dto/user.dto';
import { UserResponse } from './entities/user.response';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { PrismaClient } from '@prisma/client';
import { diskStorage } from 'multer';
import { AuthGuard } from '@nestjs/passport';
@ApiTags('User')
@Controller('api/users')
export class UserController {
  private prisma = new PrismaClient();

  constructor(
    private readonly userService: UserService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Get()
  getUser(): Promise<UserResponse> {
    return this.userService.getUser();
  }

  @Post('')
  @ApiBody({ type: UserDTO })
  async postUser(@Body() body: UserDTO): Promise<UserResponse> {
    return this.userService.postUser(body);
  }

  @Delete(':user_id')
  deleteUser(@Param('user_id') user_id: number) {
    return this.userService.deleteUser(+user_id);
  }

  @Get('pagination-search-user')
  @ApiQuery({ name: 'pageIndex', type: Number, required: false })
  @ApiQuery({ name: 'pageSize', type: Number, required: false })
  @ApiQuery({ name: 'keyword', type: String, required: false })
  paginationSearchJob(
    @Query('pageIndex') pageIndex: number,
    @Query('pageSize') pageSize: number,
    @Query('keyword') keyword: string,
  ): Promise<any> {
    return this.userService.paginationSearchUser(pageIndex, pageSize, keyword);
  }

  @Get(':user_id')
  @ApiParam({ name: 'user_id', type: Number })
  getUserById(@Param('user_id') user_id: number): Promise<UserResponse> {
    return this.userService.getUserById(+user_id);
  }

  @Put(':user_id')
  @ApiParam({ name: 'user_id', type: Number })
  @ApiBody({ type: UserDTO })
  putUserById(
    @Body() body: UserDTO,
    @Param('user_id') user_id,
  ): Promise<UserResponse> {
    return this.userService.putUserById(user_id, body);
  }

  @Get('/search/:user_name')
  @ApiParam({ name: 'user_name', type: String })
  async getSearchUserByName(
    @Param('user_name') user_name: string,
  ): Promise<UserResponse> {
    return this.userService.getSearchUserByName(user_name);
  }

  @Post('/upload-avatar/:user_id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiParam({ name: 'user_id', required: true })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Upload a file',
    type: 'multipart/form-data',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: process.cwd() + '/public/img',
        filename: (req, file, callback) => {
          callback(null, new Date().getTime() + `${file.originalname}`);
        },
      }),
    }),
  )
  uploadAvatar(
    @UploadedFile('file') file,
    @Param('user_id') user_id: number,
    @Body() body: UserDTO,
  ): Promise<any> {
    return this.userService.uploadAvatar(file.filename, +user_id, body);
  }
}
