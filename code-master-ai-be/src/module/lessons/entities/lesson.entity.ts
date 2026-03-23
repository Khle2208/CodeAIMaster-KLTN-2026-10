import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type LessonDocument = HydratedDocument<Lesson>;

@Schema({ timestamps: true })
export class Lesson {
  @Prop({ type: Types.ObjectId, ref: 'Course', required: true }) course_id: Types.ObjectId | undefined;
  @Prop({ required: true }) title: string | undefined;
  @Prop() content: string | undefined;
  @Prop() video_url: string | undefined;
  @Prop() lesson_order: number | undefined;
}
export const LessonSchema = SchemaFactory.createForClass(Lesson);