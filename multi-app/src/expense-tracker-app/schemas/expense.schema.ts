import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Category } from '../utils/enums';

export type ExpenseDocument = HydratedDocument<Expense>;

@Schema({ timestamps: true }) // Adds createdAt and updatedAt timestamps
export class Expense {
  @Prop({ required: true, minlength: 1, maxlength: 100 }) // Validation for title length
  title: string;

  @Prop({ required: true, min: 0 }) // Ensure amount is a positive number
  amount: number;

  @Prop({ required: true }) // Ensure date is provided
  date: Date;

  @Prop({ required: true, enum: Category }) // Ensure category is one of the predefined values
  category: Category;

  // Add a reference to the User schema (One-to-Many relationship)
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId;
}

// Create the schema
export const ExpenseSchema = SchemaFactory.createForClass(Expense);
