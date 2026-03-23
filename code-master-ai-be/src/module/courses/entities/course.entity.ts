import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type CourseDocument = HydratedDocument<Course>;

@Schema({ timestamps: true })
export class Course {
  @Prop({ required: true }) title: string | undefined;
  @Prop() description: string | undefined;
  @Prop({ required: true }) price: number | undefined;
  @Prop() level: string | undefined;
  @Prop() thumbnail: string | undefined;
  @Prop({ default: 'active' }) status: string | undefined;
  @Prop({ type: Types.ObjectId, ref: 'Category', required: true }) category_id: Types.ObjectId | undefined;
}
export const CourseSchema = SchemaFactory.createForClass(Course);