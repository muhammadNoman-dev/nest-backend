import { Body,Param, Controller, Get, Post,Delete, UseGuards,Put } from "@nestjs/common"
import { CategoriesService } from "./category.services";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { CreateCategoryDto, GetCategoryDto, UpdateCategoryDto } from "./categorydto/category.dto";

@Controller("categories")
@ApiTags("Categories")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("categories")
export class CategoriesController {
	constructor(private readonly categories: CategoriesService) {}

	@Get("categories")
	async getAll(){
	  const categories = await this.categories.getAll()
	  return categories
	}

	@Post("categories")
	async create(@Body() body:CreateCategoryDto ){
	  const category = await this.categories.create(body)
	  return category
	}

	@Delete("category/:categoryId")
	async delete(@Param() params:GetCategoryDto ){
	  const category = await this.categories.delete(params)
	  return category
	}

	@Put("category/:categoryId")
	async updateCategoryById(
		@Param() params: GetCategoryDto,
		@Body() body: UpdateCategoryDto	) {
		const category = await this.categories.update(params.id, body)
		return category
	}

}
