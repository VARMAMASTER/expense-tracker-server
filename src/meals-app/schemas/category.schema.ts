import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type CategoryDocument = HydratedDocument<Category>;

@Schema({ timestamps: true }) // Adds createdAt and updatedAt timestamps
export class Category {
  @Prop({ type: String, required: true }) // Title of the category
  title: string;

  @Prop({ type: String, required: true }) // Color field to store color codes
  color: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Meal' }] }) // List of Meal references
  meals: Types.ObjectId[];
}

// Create the schema
export const CategorySchema = SchemaFactory.createForClass(Category);
