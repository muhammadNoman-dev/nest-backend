import { ApiProperty, PartialType } from "@nestjs/swagger"
import { IsString, IsNotEmpty, IsMongoId } from "class-validator"


export class GetCarDto {
	@ApiProperty({ default: "", description: "Car ID" })
	@IsMongoId()
	carId: string
}

export class CreateCarDto {
	@ApiProperty({ default: "" })
	@IsString()
	@IsNotEmpty()
	color: string

	@ApiProperty({ default: "" })
	@IsString()
	@IsNotEmpty()
	model: string

	@ApiProperty({ default: "" })
	@IsString()
	@IsNotEmpty()
	make: string

	@ApiProperty({ default: "" })
	@IsString()
	@IsNotEmpty()
	registrationNumber: string

	@ApiProperty({ default: "" })
	@IsNotEmpty()
	@IsMongoId()
	category: string
}

export class FilterCarDto extends PartialType(CreateCarDto) {}

export class UpdateCarDto extends PartialType(CreateCarDto) {}
