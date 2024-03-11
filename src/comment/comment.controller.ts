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
import { CommentResponse } from './entities/comment.response';

@ApiTags('Comments')
@Controller('api/comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  // GET COMMENT
  @Get()
  getComment(): Promise<CommentResponse> {
    return this.commentService.getComment();
  }

  // POST COMMENT
  @Post('')
  @ApiBody({ type: CommentsDTO })
  async postComment(@Body() body: CommentsDTO): Promise<CommentResponse> {
    return this.commentService.postComment(body);
  }

  // PUT COMMENT BY ID
  @Put(':comment_id')
  @ApiParam({ name: 'comment_id', type: Number })
  @ApiBody({ type: CommentsDTO })
  putCommentById(
    @Body() body: CommentsDTO,
    @Param('comment_id') comment_id: number,
  ): Promise<CommentResponse> {
    return this.commentService.putCommentById(comment_id, body);
  }

  // DELETE COMMENT BY ID COMMENT
  @Delete(':comment_id')
  deleteComment(@Param('comment_id') comment_id: number) {
    return this.commentService.deleteComment(+comment_id);
  }

  // GET COMMENT BY JOB {JOB_ID}
  @Get('get-comment-by-job/:job_id')
  @ApiParam({ name: 'job_id', type: Number })
  getCommentByJob(@Param('job_id') job_id: number): Promise<any> {
    return this.commentService.getCommentByJob(+job_id);
  }
}
