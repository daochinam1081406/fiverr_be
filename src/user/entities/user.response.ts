import { UserEntity } from './user.entity';

export class UserResponse {
  statusCode: number;
  content: UserEntity[];
  message: string;
}
