import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [
    // nap bien cuc bo .env
    ConfigModule.forRoot({
      isGlobal:true,
    }),
    // cau hinh ket noi mongodb voi cac tuy chon va toi uu va bao mat
    MongooseModule.forRootAsync({
      imports:[ConfigModule],
      useFactory: async (configService:ConfigService)=>({
        uri:configService.get<string>('MONGODB_URI'),
      }),
      inject:[ConfigService]
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
