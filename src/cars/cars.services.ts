import { Injectable,NotFoundException } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"
import { Car, CarDocument } from "src/schemas/car.schema"
import { CreateCarDto, GetCarDto, UpdateCarDto } from "./cardto/car.dto"

@Injectable()
export class CarsService {
	constructor(@InjectModel(Car.name) private readonly carModel: Model<CarDocument>) {}

	findById(id: string) {
		return this.carModel.findById(id).lean().exec()
	}

	getAll() {
		return this.carModel.find().exec()
	}

	findOne(filters: Partial<Car>) {
		return this.carModel.findOne(filters).lean().exec()
	}

	async create(car: CreateCarDto) {
		const createdCar = await new this.carModel(car).save()
		return createdCar.toObject()
	}

	async delete(id: GetCarDto) {
		const deletedCar = await this.carModel.findOneAndDelete({ _id: id })
		return deletedCar
	}

	async update(id: string, car: UpdateCarDto) {
		const carFound = await this.findById(id)

		if (!carFound) throw new NotFoundException("Not Found")
		const updatedCar = await this.carModel.findByIdAndUpdate(id, { $set: car }, { new: true })

		const carObject = updatedCar?.toObject()
		return carObject
	}
}
