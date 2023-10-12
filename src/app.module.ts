import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from './config/config.module'
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigService } from './config/config.service'
import { UsersModule } from './users/users.module'
import { AuthModule } from './auth/auth.module'
@Module({
	imports: [
		ConfigModule,
		MongooseModule.forRootAsync({
			inject: [ConfigService],
			useFactory: async (configService: ConfigService) => ({
				uri: configService.mongodbURI,
			}),
		}),
		AuthModule,
		UsersModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
