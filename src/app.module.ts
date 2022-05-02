import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { JwtModule } from '@nestjs/jwt';
import { secret } from './util/constants';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidV4 } from 'uuid';
import { VideoController } from './video/video.controller';
import { VideoService } from './video/video.service';
import { User, UserSchema } from './model/user.schema';
import { Video, VideoSchema } from './model/video.schema';
import { isAuthenticated } from './app.middleware';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/Stream'),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Video.name, schema: VideoSchema }]),
    MulterModule.register({
      storage: diskStorage({
        destination: './public',
        filename: (req, file, callback) => {
          const extension = file.mimetype.split('/')[1];
          callback(null, `${uuidV4()}-${Date.now()}}.${extension}`);
        },
      }),
    }),
    JwtModule.register({
      secret,
      signOptions: { expiresIn: '2h' },
    }),
    ServeStaticModule.forRoot({ rootPath: join(__dirname, '..', 'public') }),
  ],
  controllers: [AppController, UserController, VideoController],
  providers: [AppService, UserService, VideoService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(isAuthenticated)
      .exclude({ path: '/api/v1/video/:id', method: RequestMethod.GET })
      .forRoutes(VideoController);
  }
}
