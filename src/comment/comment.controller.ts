import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  Query,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CommentsDTO } from './dto/comments.dto';

@ApiTags('Comments')
@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  // GET COMMENT
  @Get()
  getComment(): Promise<any> {
    return this.commentService.getComment();
  }

  // POST COMMENT
  @Post('')
  @ApiBody({ type: CommentsDTO })
  async postComment(@Body() body: CommentsDTO, @Res() response): Promise<any> {
    const data = await this.commentService.postComment(body);
    response.status(data.status).json(data);
  }

  // PUT COMMENT
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
  //   return this.commentService.update(+id, updateCommentDto);
  // }

  // DELETE COMMENT
  @Delete('')
  @ApiQuery({ name: 'user_id', type: Number })
  async deleteComment(@Query('user_id') user_id: number): Promise<any> {
    return this.commentService.deleteComment(user_id);
  }

  // GET COMMENT BY JOB {JOB_ID}
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.commentService.findOne(+id);
  // }
}
