import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from './config/config.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CarsModule } from './cars/cars.module';
// import { CategoriesModule } from './category/category.module';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/whatever', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    // MongooseModule.forRoot('mongodb://localhost:27017/whatever'), 
    ConfigModule,
    // MongooseModule.forRootAsync({
    //   inject: [ConfigService],
    //   useFactory: async (configService: ConfigService) => ({
    //     uri: configService.mongodbURI,
    //   }),
    // }),
    AuthModule,
    UsersModule,
    // CarsModule,
    // CategoriesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
