import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { HydratedDocument } from 'mongoose';
import { Role } from 'src/auth/dto/auth.dto';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true }) // Adds createdAt and updatedAt timestamps
export class User {
  @Prop({ required: true, minlength: 1, maxlength: 50 }) // Validation for name length
  name: string;

  @Prop({ required: true, unique: true, maxlength: 100 }) // Ensure email is unique and valid
  email: string;

  @Prop({ required: true, minlength: 6, maxlength: 20 }) // Ensure password length
  password: string;

  @Prop({ enum: Role, default: Role.USER }) // Ensure role is one of the predefined values
  role: Role;

  @Prop({ default: true }) // Default isActive to true
  isActive: boolean;

  @Prop({ type: String, maxlength: 255 }) // Optional address field
  address?: string;

  @Prop({ type: String }) // Optional date of birth field
  dateOfBirth?: string;

  @Prop({ required: true, type: String }) // Optional phone number field
  phoneNumber?: string;
}

// Create the schema
export const UserSchema = SchemaFactory.createForClass(User);

// Add the pre-save hook to hash the password before saving
UserSchema.pre<UserDocument>('save', async function (next) {
  // Check if the password field is modified or new
  if (this.isModified('password') || this.isNew) {
    try {
      const salt = await bcrypt.genSalt(10); // Generate salt with 10 rounds
      this.password = await bcrypt.hash(this.password, salt); // Hash the password
      next(); // Call the next middleware
    } catch (error) {
      next(error); // Pass the error to the next middleware
    }
  } else {
    next(); // Call the next middleware if the password is not modified
  }
});
