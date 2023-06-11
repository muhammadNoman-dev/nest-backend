import { Controller } from "@nestjs/common"
import { CarsService } from "./cars.services";

@Controller("cars")
export class CarsController {
	constructor(private readonly carsService: CarsService) {}
}
