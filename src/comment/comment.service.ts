import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CommentsDTO } from './dto/comments.dto';

@Injectable()
export class CommentService {
  prisma = new PrismaClient();

  // GET COMMENT
  async getComment(): Promise<any> {
    return await this.prisma.comments.findMany();
  }

  // POST COMMENT
  async postComment(body: CommentsDTO): Promise<any> {
    try {
      const { comment_id } = body;
      const { job_id, commenter_id, content, comment_rating, comment_date } =
        body;

      const commentDB = await this.prisma.comments.findFirst({
        where: { comment_id },
      });

      if (!commentDB) {
        const commenterDB = await this.prisma.comments.findFirst({
          where: {
            commenter_id,
          },
        });

        const jobDB = await this.prisma.comments.findFirst({
          where: {
            job_id,
          },
        });

        if (commenterDB && jobDB) {
          const newComment = {
            job_id,
            commenter_id,
            comment_date,
            comment_rating,
            content,
          };
          // const data = await this.prisma.comments.create(newComment);
          return {
            status: 200,
            //data:data
            message: 'Create comment successfull!',
          };
        } else {
          return {
            status: 400,
            message: 'Commenters and jobs not found!',
          };
        }
      }
      return {
        status: 400,
        message: 'Comment already exists!',
      };
    } catch (error) {
      return { status: 500, message: `${error}` };
    }
  }

  // PUT COMMENT
  async putCommentById(body: CommentsDTO): Promise<any> {
    try {
      const { comment_id } = body;
      const { comment_date, comment_rating, commenter_id, content, job_id } =
        body;
      const commentDB = await this.prisma.comments.findFirst({
        where: { comment_id },
      });
      if (commentDB) {
        const newComment = {
          comment_date,
          job_id,
          commenter_id,
          comment_rating,
          content,
        };
        // await this.prisma.comments.update(newComment);
        return {
          status: 201,
          message: 'Update comment successfull!',
        };
      } else {
        return { status: 400, message: 'No comment found!' };
      }
    } catch (error) {
      return { status: 500, message: `${error}` };
    }
  }

  // DELETE COMMENT
  async deleteComment(comment_id: number): Promise<any> {
    const commentDB = await this.prisma.comments.findFirst({
      where: {
        comment_id,
      },
    });
    if (commentDB) {
      await this.prisma.comments.delete({
        where: { comment_id },
      });
      return {
        status: 200,
        message: 'Delete successfull!',
      };
    } else {
      return {
        status: 400,
        message: 'Delete fail!',
      };
    }
  }

  // GET COMMENT BY JOB
  async getCommentByJob(job_id: number) {
    const job = await this.prisma.comments.findFirst({
      where: {
        job_id,
      },
    });

    if (job) {
      await this.prisma.comments.findMany({
        where: {
          job_id,
        },
      });
      return { status: 200, message: 'Get successfull!' };
    }
  }
}
