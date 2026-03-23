import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type AssignmentDocument = HydratedDocument<Assignment>;

@Schema({ timestamps: true })
export class Assignment {
  @Prop({ type: Types.ObjectId, ref: 'Lesson', required: true }) lesson_id: Types.ObjectId | undefined;
  @Prop({ required: true }) title: string | undefined;
  @Prop() description: string | undefined;
  @Prop() max_score: number | undefined;
  @Prop() due_date: Date | undefined;
  @Prop({ required: true }) type: string | undefined; // 'quiz' or 'code'
}
export const AssignmentSchema = SchemaFactory.createForClass(Assignment);