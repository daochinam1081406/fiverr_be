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
  Put,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { ApiBody, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CommentsDTO } from './dto/comments.dto';

@ApiTags('Comments')
@Controller('api/comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  // GET COMMENT
  @Get()
  getComment(): Promise<any> {
    return this.commentService.getComment();
  }

  // POST COMMENT
  @Post()
  @ApiBody({ type: CommentsDTO })
  async postComment(@Body() body: CommentsDTO, @Res() response): Promise<any> {
    const data = await this.commentService.postComment(body);
    response.status(data.status).json(data);
  }

  // PUT COMMENT BY ID
  @Put(':comment_id')
  @ApiBody({ type: CommentsDTO })
  @ApiParam({ name: 'comment_id', type: Number })
  async putCommentById(
    @Body() body: CommentsDTO,
    @Res() response,
  ): Promise<any> {
    const data = await this.commentService.putCommentById(body);
    response.status(data.status).json(data);
  }

  // DELETE COMMENT BY ID COMMENT
  @Delete(':comment_id')
  @ApiQuery({ name: 'user_id', type: Number })
  async deleteComment(@Query('comment_id') comment_id: number): Promise<any> {
    return this.commentService.deleteComment(+comment_id);
  }

  // GET COMMENT BY JOB {JOB_ID}
  @Get('/get-comment-by-job/:job_id')
  @ApiParam({ name: 'job_id', type: Number })
  async getCommentByJob(@Param('job_id') job_id: number): Promise<any> {
    return this.commentService.getCommentByJob(job_id);
  }
}
