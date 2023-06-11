import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import  { Model, Types } from "mongoose"
import { Category, CategoryDocument } from "src/schemas/category.schema"
import { CreateCategoryDto, GetCategoryDto, UpdateCategoryDto } from "./categorydto/category.dto"
import { CarsService } from "src/cars/cars.services"

@Injectable()
export class CategoriesService {
	constructor(@InjectModel(Category.name) private readonly categoryModel: Model<CategoryDocument>, 
		private readonly carService: CarsService ) {}

	findById(id: string) {
		return this.categoryModel.findById(id).lean().exec()
	}

    getAll() {
		return this.categoryModel.find().exec()
	}

	findOne(filters: Partial<Category>) {
		return this.categoryModel.findOne(filters).lean().exec()
	}

	async create(category: CreateCategoryDto) {
		const createdCategory = await new this.categoryModel(category).save()
		return createdCategory.toObject()
	}

	async delete(id: string) {
		const deletedCategory = await this.categoryModel.findOneAndDelete({ _id: new Types.ObjectId(id) })
		const deletedCarsIds =  await this.carService.deleteCarsFromCategories(deletedCategory?._id)

		return {...deletedCategory?.toObject(), deletedCarsIds} 
	}

	async update(id: string, category: UpdateCategoryDto) {
		const categoryFound = await this.findById(id)

		if (!categoryFound) throw new NotFoundException("Not Found")
		const updatedcategory = await this.categoryModel.findByIdAndUpdate(id, { $set: category }, { new: true })

		const categoryObject = updatedcategory?.toObject()
		return categoryObject
	}
}
