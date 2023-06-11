import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"
import { CategoriesController } from "./category.controller"
import { CategoriesService } from "./category.services"
import { Category, CategorySchema } from "src/schemas/category.schema"

@Module({
	imports: [MongooseModule.forFeature([{ name: Category.name, schema: CategorySchema }])],
	controllers: [CategoriesController],
	providers: [CategoriesService],
	exports: [CategoriesService],
})
export class CategoriesModule {}


