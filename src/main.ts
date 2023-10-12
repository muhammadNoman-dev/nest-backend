import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ConfigService } from './config/config.service'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	app.setGlobalPrefix('api')

	const swaggerConfig = new DocumentBuilder()
		.setTitle('Hidden Dots Backend')
		.setDescription('Loan Management Application')
		.setVersion('1.0')
		.addBearerAuth()
		.build()

	const document = SwaggerModule.createDocument(app, swaggerConfig)
	SwaggerModule.setup('docs', app, document, {
		swaggerOptions: { persistAuthorization: true },
	})

	const appConfig = app.get(ConfigService)
	app.enableCors()
	await app.listen(appConfig.port)
	console.warn(`App is running on port ${appConfig.port}`)
}
bootstrap()
