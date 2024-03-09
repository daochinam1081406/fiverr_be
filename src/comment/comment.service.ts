import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class CommentService {
  prisma = new PrismaClient();

  // GET COMMENT
  async getComment(): Promise<any> {
    return await this.prisma.comments.findMany();
  }

  // POST COMMENT
  async postComment(body): Promise<any> {
    return;
  }

  // DELETE COMMENT
  async deleteComment(user_id: number) {
    return;
  }
}
