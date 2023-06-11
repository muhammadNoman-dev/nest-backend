import { Schema, SchemaFactory, Prop } from "@nestjs/mongoose"
import { Document } from "mongoose"

@Schema({ timestamps: true })
export class Category {
	@Prop()
	name: string
}

export type CategoryDocument = Category & Document
export const CategorySchema = SchemaFactory.createForClass(Category)
