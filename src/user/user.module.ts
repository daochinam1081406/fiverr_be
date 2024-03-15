import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
@Module({
  controllers: [UserController],
  providers: [UserService, CloudinaryService],
  imports: [CloudinaryModule],
})
export class UserModule {}
