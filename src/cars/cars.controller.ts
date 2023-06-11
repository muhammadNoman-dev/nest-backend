import { Body,Param, Controller, Get, Post,Delete, UseGuards,Put } from "@nestjs/common"
import { CarsService } from "./cars.services";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { CreateCarDto, GetCarDto, UpdateCarDto } from "./cardto/car.dto";

@ApiTags("Car")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("cars")
export class CarsController {
	constructor(private readonly carsService: CarsService) {}

	
	@Get("cars")
	async getAll(){
	  const cars = await this.carsService.getAll()
	  return cars
	}

	@Post("car")
	async create(@Body() body:CreateCarDto ){
	  const car = await this.carsService.create(body)
	  return car
	}

	@Delete("car/:id")
	async delete(@Param() params:GetCarDto ){
	  const car = await this.carsService.delete(params)
	  return car
	}

	@Put("car/:id")
	async updateCarById(
		@Param() params: GetCarDto,
		@Body() body: UpdateCarDto	) {
		const car = await this.carsService.update(params.id, body)
		return car
	}
}
