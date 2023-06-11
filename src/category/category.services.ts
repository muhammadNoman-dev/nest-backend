// import { Injectable, NotFoundException } from "@nestjs/common"
// import { InjectModel } from "@nestjs/mongoose"
// import { Model } from "mongoose"
// import { SignupDto } from "src/auth/dto/signup.dto"
// import { Category, CategoryDocument } from "src/schemas/category.schema"
// import { UpdateCategoryDto } from "./categorydto/category.dto"

// @Injectable()
// export class CategoriesService {
// 	constructor(@InjectModel(Category.name) private readonly categoryModel: Model<CategoryDocument>) {}

// 	findById(id: string) {
// 		return this.categoryModel.findById(id).lean().exec()
// 	}

// 	findOne(filters: Partial<Category>) {
// 		return this.categoryModel.findOne(filters).lean().exec()
// 	}

// 	async create(category: SignupDto) {
// 		const createdUser = await new this.categoryModel(category).save()
// 		return createdUser.toObject()
// 	}

// 	async delete(id: string) {
// 		const deletedCategory = await this.categoryModel.findOneAndDelete({ _id: id })
// 		return deletedCategory
// 	}

// 	async update(id: string, category: UpdateCategoryDto) {
// 		const categoryFound = await this.findById(id)

// 		if (!categoryFound) throw new NotFoundException("Not Found")
// 		const updatedcategory = await this.categoryModel.findByIdAndUpdate(id, { $set: category }, { new: true })

// 		const categoryObject = updatedcategory?.toObject()
// 		return categoryObject
// 	}
// }