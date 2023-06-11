import { Schema, SchemaFactory, Prop } from "@nestjs/mongoose"
import mongoose, { Document } from "mongoose"
import { Category } from "./category.schema"

@Schema({ timestamps: true })
export class Car {
	@Prop()
	color: string

	@Prop()
	model: string

	@Prop()
	make: string

	@Prop()
	registrationNumber: string

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Category.name })
	category: Category

}

export type CarDocument = Car & Document
export const CarSchema = SchemaFactory.createForClass(Car)
