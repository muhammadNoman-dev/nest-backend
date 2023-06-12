import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Car, CarDocument } from "src/schemas/car.schema"
import { CreateCarDto, GetCarDto, UpdateCarDto } from "./cardto/car.dto"
import { Category } from "src/schemas/category.schema"
import { Model, Types } from "mongoose"

@Injectable()
export class CarsService {
	constructor(@InjectModel(Car.name) private readonly carModel: Model<CarDocument>) { }

	findById(id: string) {
		return this.carModel.findById(id).lean().exec()
	}

	getAll() {
		return this.carModel.find().populate({ path: "category", model: Category.name, select: { name: 1 }, transform: doc => doc.name }).exec()
	}

	findOne(filters: Partial<Car>) {
		return this.carModel.findOne(filters).lean().exec()
	}

	async create(car: CreateCarDto) {
		// const createdCar = (await new this.carModel(car).save())
		const createdCar = await new this.carModel(car).save().then(t => t.populate({ path: "category", model: Category.name, select: { name: 1 }, transform: doc => doc.name }))
		return createdCar.toObject()
	}

	async delete(id: string | string[]) {
		if (Array.isArray(id)) {
			const deletedCars = await this.carModel.deleteMany(id)
		} else {
			const deletedCar = await this.carModel.findOneAndDelete({ _id: new Types.ObjectId(id) })
			return deletedCar
		}
	}

	async deleteCarsFromCategories(categoryId: string) {
		const categoryCars = await this.carModel.find({ category: categoryId })

		const ids: string[] = categoryCars.map(cars => cars._id)
		const deletedCars = await this.carModel.deleteMany({ id: { $in: ids } })

		if (!!deletedCars.deletedCount) return ids
	}

	async update(id: string, car: UpdateCarDto) {
		const carFound = await this.findById(id)

		if (!carFound) throw new NotFoundException("Not Found")
		const updatedCar = await this.carModel.findByIdAndUpdate(new Types.ObjectId(id), { $set: car }, { new: true }).populate({ path: "category", model: Category.name, select: { name: 1 }, transform: doc => doc.name })

		const carObject = updatedCar?.toObject()
		return carObject
	}
}
