import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CoursesModule } from './modules/courses/courses.module';
import { CategoryModule } from './modules/category/category.module';
import { AssigmentsModule } from './modules/assigments/assigments.module';
import { LessonsModule } from './modules/lessons/lessons.module';

@Module({
  imports: [
    // nap bien cuc bo .env
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // cau hinh ket noi mongodb voi cac tuy chon va toi uu va bao mat
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URL'),
      }),
      inject: [ConfigService],
    }),
    CoursesModule,
    CategoryModule,
    AssigmentsModule,
    LessonsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
