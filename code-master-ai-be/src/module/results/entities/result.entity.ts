import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type ResultDocument = HydratedDocument<Result>;

@Schema({ timestamps: true })
export class Result {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true }) user_id: Types.ObjectId | undefined;
  @Prop({ type: Types.ObjectId, ref: 'Course', required: true }) course_id: Types.ObjectId | undefined;
  @Prop({ default: 0 }) score: number | undefined;
  @Prop({ default: 0 }) progress_percent: number | undefined;
  @Prop({ default: false }) completed: boolean | undefined;
}
export const ResultSchema = SchemaFactory.createForClass(Result);