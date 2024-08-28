import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { HydratedDocument } from 'mongoose';
import { Role } from '../utils/enums';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, minlength: 1, maxlength: 50 })
  name: string;

  @Prop({ required: true, unique: true, maxlength: 100 })
  email: string;

  @Prop({ required: true, minlength: 6 })
  password: string;

  @Prop({ enum: Role, default: Role.USER })
  role: Role;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ type: String, maxlength: 255 })
  address?: string;

  @Prop({ type: String })
  dateOfBirth?: string;

  @Prop({ type: String })
  phoneNumber?: string;

  @Prop({ type: [String], ref: 'Expense', default: [] }) // Initialize as an
  expenses: string[];
}

// Create the schema
export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre<UserDocument>('save', async function (next) {
  if (this.isModified('password') || this.isNew) {
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});
