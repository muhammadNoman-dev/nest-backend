import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"
import { CarsService } from "./cars.services"
import { CarsController } from "./cars.controller"
import { Car, CarSchema } from "src/schemas/car.schema"

@Module({
	imports: [MongooseModule.forFeature([{ name: Car.name, schema: CarSchema }])],
	controllers: [CarsController],
	providers: [CarsService],
	exports: [CarsService],
})
export class CarsModule {}
