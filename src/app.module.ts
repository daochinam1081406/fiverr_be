import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { UserModule } from './user/user.module';
import { CommentModule } from './comment/comment.module';
import { JobModule } from './job/job.module';
import { JobTypeModule } from './job-type/job-type.module';
import { JobTypeDetailModule } from './job-detail-type/job-type-detail.module';
import { HireJobModule } from './hire-job/hire-job.module';


@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    ServeStaticModule.forRoot({ rootPath: '.' }),
    UserModule,
    CommentModule,
    JobModule,
    JobTypeModule,
    JobTypeDetailModule,
    HireJobModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
