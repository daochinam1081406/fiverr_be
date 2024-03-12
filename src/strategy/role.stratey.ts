import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class RoleGuards implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    console.log("Request",request)

    if (request.user.role === 'admin') {
      return true;
      
    }else{
      throw new HttpException(
        'Can not access',
        HttpStatus.FORBIDDEN,
      );
    }
    
  }
}
