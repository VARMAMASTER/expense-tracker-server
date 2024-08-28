import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Affordability, Complexity } from '../utils/enums';

export type MealDocument = HydratedDocument<Meal>;

@Schema({ timestamps: true }) // Adds createdAt and updatedAt timestamps
export class Meal {
  @Prop({ type: String, required: true }) // Title of the meal
  title: string;

  @Prop({ type: String, required: true, enum: Object.values(Affordability) }) // Affordability level
  affordability: Affordability;

  @Prop({ type: String, required: true, enum: Object.values(Complexity) }) // Complexity level
  complexity: Complexity;

  @Prop({ type: String, required: true }) // URL of the meal's image
  imageUrl: string;

  @Prop({ type: Number, required: true }) // Duration to prepare the meal in minutes
  duration: number;

  @Prop({ type: [String], required: true }) // List of ingredients
  ingredients: string;

  @Prop({ type: [String], required: true }) // List of preparation steps
  steps: string;

  @Prop({ type: Boolean, required: true }) // Indicates if the meal is gluten-free
  isGlutenFree: boolean;

  @Prop({ type: Boolean, required: true }) // Indicates if the meal is vegan
  isVegan: boolean;

  @Prop({ type: Boolean, required: true }) // Indicates if the meal is vegetarian
  isVegetarian: boolean;

  @Prop({ type: Boolean, required: true }) // Indicates if the meal is lactose-free
  isLactoseFree: boolean;
}

// Create the schema
export const MealSchema = SchemaFactory.createForClass(Meal);
