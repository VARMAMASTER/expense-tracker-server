import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Category } from '../utils/enums';

export type ExpenseDocument = HydratedDocument<Expense>;

@Schema({ timestamps: true })
export class Expense {
  @Prop({ required: true, minlength: 1, maxlength: 100 })
  title: string;

  @Prop({ required: true, min: 0 })
  amount: number;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true, enum: Category })
  category: Category;

  @Prop({ type: String, ref: 'User', required: true }) // Store user as a string
  user: string;
}

// Create the schema
export const ExpenseSchema = SchemaFactory.createForClass(Expense);
