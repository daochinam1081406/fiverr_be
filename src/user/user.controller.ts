import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Res,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
// import { FileInterceptor } from '@nestjs/platform-express';
// import { diskStorage } from 'multer';
import { ApiTags, ApiBody, ApiQuery, ApiParam } from '@nestjs/swagger';
import { UserDTO } from './dto/user.dto';
import { UserResponse } from './entities/user.response';

@ApiTags('User')
@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUser(): Promise<UserResponse> {
    return this.userService.getUser();
  }

  // POST USER
  @Post('')
  @ApiBody({ type: UserDTO })
  async postUser(@Body() body: UserDTO): Promise<UserResponse> {
    return this.userService.postUser(body);
  }

  // DELETE USER
  @Delete(':user_id')
  deleteUser(@Param('user_id') user_id: number) {
    return this.userService.deleteUser(+user_id);
  }

  // PAGINATION PAGE AND SEARCH USER
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

  // GET USER BY ID
  @Get(':user_id')
  @ApiParam({ name: 'user_id', type: Number })
  getUserById(@Param('user_id') user_id: number): Promise<UserResponse> {
    return this.userService.getUserById(+user_id);
  }

  // PUT USER BY ID
  @Put(':user_id')
  @ApiParam({ name: 'user_id', type: Number })
  @ApiBody({ type: UserDTO })
  putUserById(
    @Body() body: UserDTO,
    @Param('user_id') user_id,
  ): Promise<UserResponse> {
    return this.userService.putUserById(user_id, body);
  }

  // SEARCH USER BY NAME
  @Get('/search/:user_name')
  @ApiParam({ name: 'user_name', type: String })
  async getSearchUserByName(
    @Param('user_name') user_name: string,
  ): Promise<UserResponse> {
    return this.userService.getSearchUserByName(user_name);
  }

  // UPLOAD AVATAR
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
