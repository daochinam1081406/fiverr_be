import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { CommentsDTO } from './dto/comments.dto';
import { CommentResponse } from './entities/comment.response';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Comments')
@Controller('api/comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get()
  getComment(): Promise<CommentResponse> {
    return this.commentService.getComment();
  }

  @Post('')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiBody({ type: CommentsDTO })
  async postComment(@Body() body: CommentsDTO): Promise<CommentResponse> {
    return this.commentService.postComment(body);
  }

  @Put(':comment_id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiParam({ name: 'comment_id', type: Number })
  @ApiBody({ type: CommentsDTO })
  putCommentById(
    @Body() body: CommentsDTO,
    @Param('comment_id') comment_id: number,
  ): Promise<CommentResponse> {
    return this.commentService.putCommentById(comment_id, body);
  }

  @Delete(':comment_id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  deleteComment(@Param('comment_id') comment_id: number) {
    return this.commentService.deleteComment(+comment_id);
  }

  @Get('get-comment-by-job/:job_id')
  @ApiParam({ name: 'job_id', type: Number })
  getCommentByJob(@Param('job_id') job_id: number): Promise<any> {
    return this.commentService.getCommentByJob(+job_id);
  }
}
