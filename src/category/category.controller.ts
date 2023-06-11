import { Body,Param, Controller, Get, Post,Delete, UseGuards,Put } from "@nestjs/common"
import { CategoriesService } from "./category.services";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { CreateCategoryDto, GetCategoryDto, UpdateCategoryDto } from "./categorydto/category.dto";
import mongoose from "mongoose";

@ApiTags("Categories")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("categories")
export class CategoriesController {
	constructor(private readonly categories: CategoriesService) {}

	@Get("")
	async getAll(){
	  const categories = await this.categories.getAll()
	  return categories
	}

	@Post("")
	async create(@Body() body:CreateCategoryDto ){
	  const category = await this.categories.create(body)
	  return category
	}

	@Delete("/:_id")
	async delete(@Param() params:GetCategoryDto ){
	  const category = await this.categories.delete( params._id)
	  return category
	}

	@Put("/:_id")
	async updateCategoryById(
		@Param() params: GetCategoryDto,
		@Body() body: UpdateCategoryDto	) {
		const category = await this.categories.update(params._id, body)
		return category
	}

}
