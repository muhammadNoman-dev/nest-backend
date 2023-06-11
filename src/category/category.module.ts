import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"
import { Car, CarSchema } from "src/schemas/car.schema"
import { CategoriesController } from "./category.controller"
// import { CategoriesService } from "./category.services"

@Module({
	imports: [MongooseModule.forFeature([{ name: Car.name, schema: CarSchema }])],
	controllers: [CategoriesController],
	// providers: [CategoriesService],
	// exports: [CategoriesService],
})
export class CategoriesModule {}
