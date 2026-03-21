import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { CourseLevel } from '../enums/courseLevel.enum';
import { CourseStatus } from '../enums/courseStatus.enum';

export type CourseDocument = Course & Document;

@Schema({ timestamps: true })
export class Course {
  @Prop({ required: true, trim: true })
  title: string;

  @Prop({ default: '' })
  description: string;

  @Prop({ required: true, min: 0 })
  price: number;

  @Prop({
    default: 'beginner',
  })
  level: CourseLevel;

  @Prop()
  thumbnail: string;

  @Prop({
    default: 'active',
  })
  status: CourseStatus;

  //   //FK -> Category
  //   @Prop({ type: Types.ObjectId, ref: 'Category' })
  //   category: Types.ObjectId;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
