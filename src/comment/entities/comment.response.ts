import { CommentEntity } from './comment.entity';

export class CommentResponse {
  statusCode: number;
  content: CommentEntity[];
  message: string;
}
