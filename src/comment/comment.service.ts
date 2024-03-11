import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CommentsDTO } from './dto/comments.dto';
import { CommentResponse } from './entities/comment.response';
import { CommentEntity } from './entities/comment.entity';

@Injectable()
export class CommentService {
  prisma = new PrismaClient();

  // GET COMMENT
  async getComment(): Promise<CommentResponse> {
    try {
      const data: CommentEntity[] = await this.prisma.comments.findMany();
      return {
        statusCode: 200,
        content: data,
        message: 'Get comment success!',
      };
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Internal server error',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  // POST COMMENT
  async postComment(body: CommentsDTO): Promise<CommentResponse> {
    try {
      const { job_id, commenter_id, content, comment_rating } = body;

      const comment_date = new Date();

      const checkCommentDB = await this.prisma.comments.findFirst({
        where: { job_id, commenter_id, content },
      });

      if (checkCommentDB) {
        throw new HttpException(
          'Comment already exists!',
          HttpStatus.BAD_REQUEST,
        );
      } else {
        const newComment: CommentEntity = await this.prisma.comments.create({
          data: {
            job_id,
            commenter_id,
            comment_date,
            content,
            comment_rating,
          },
        });
        return {
          statusCode: 201,
          content: [newComment],
          message: 'Comment created successfully!',
        };
      }
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Internal server error',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // PUT COMMENT
  async putCommentById(
    comment_id: number,
    body: CommentsDTO,
  ): Promise<CommentResponse> {
    try {
      const comment = await this.prisma.comments.findFirst({
        where: {
          comment_id: Number(comment_id),
        },
      });

      if (!comment) {
        return { statusCode: 404, message: 'Comment not found!', content: [] };
      }

      let commentDate: Date | undefined = comment.comment_date;
      if (body.comment_date) {
        const parsedDate = new Date(body.comment_date);
        if (!isNaN(parsedDate.getTime())) {
          commentDate = parsedDate;
        } else {
          throw new Error(
            'Invalid comment_date format! Please provide the date in ISO format (YYYY-MM-DDTHH:mm:ss.sssZ)',
          );
        }
      }

      const updatedComment = await this.prisma.comments.update({
        where: {
          comment_id: Number(comment_id),
        },
        data: {
          job_id: body.job_id,
          commenter_id: body.commenter_id,
          comment_date: commentDate,
          content: body.content,
          comment_rating: body.comment_rating,
        },
      });

      return {
        statusCode: 200,
        message: 'Update comment successfully!',
        content: [updatedComment],
      };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: `Error updating comment: ${error.message}`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // DELETE COMMENT
  async deleteComment(comment_id: number): Promise<any> {
    try {
      const checkCommentDB = await this.prisma.comments.findUnique({
        where: { comment_id },
      });

      if (!checkCommentDB) {
        throw new HttpException('Comment not found!', HttpStatus.NOT_FOUND);
      }

      await this.prisma.comments.delete({
        where: { comment_id },
      });

      return {
        status: HttpStatus.OK,
        message: 'Delete comment successfully',
      };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: `Error deleting comment: ${error.message}`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // GET COMMENT BY JOB
  async getCommentByJob(job_id: number): Promise<any> {
    try {
      const comments = await this.prisma.comments.findMany({
        where: {
          job_id: job_id,
        },
      });

      if (!comments || comments.length === 0) {
        return { status: 404, message: 'Comments not found', content: [] };
      }

      return {
        status: 200,
        message: 'Comments found',
        content: comments,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: `Error retrieving comments: ${error.message}`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
