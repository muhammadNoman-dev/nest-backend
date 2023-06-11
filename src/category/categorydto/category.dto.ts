import { ApiProperty, PartialType } from "@nestjs/swagger"
import { IsString, IsNotEmpty, IsMongoId } from "class-validator"


export class GetCategoryDto {
	@ApiProperty({ default: "", description: "Category ID" })
	@IsMongoId()
	_id: string
}

export class CreateCategoryDto {
	@ApiProperty({ default: "" })
	@IsString()
	@IsNotEmpty()
	name: string
}

export class FilterCategoryDto extends PartialType(CreateCategoryDto) {}

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}
