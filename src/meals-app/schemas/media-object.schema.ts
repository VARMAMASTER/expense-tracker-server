import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MediaDocument = HydratedDocument<Media>;

@Schema({ timestamps: true }) // Adds createdAt and updatedAt timestamps
export class Media {
  @Prop({ type: String, required: true }) // Optional CategoryId field
  CategoryId?: string;

  @Prop({ type: String, required: false }) // Optional type field
  type?: string;

  @Prop({ type: String, required: false }) // Optional subType field
  subType?: string;

  @Prop({ required: true }) // Ensure fileUrl is provided and valid
  fileUrl: string;

  @Prop({ required: true }) // Ensure fileUrl is provided and valid
  originalFileName: string;
}

// Create the schema
export const MediaSchema = SchemaFactory.createForClass(Media);
