import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type AssignmentDocument = HydratedDocument<Assignment>;

@Schema({ timestamps: true })
export class Assignment {
  @Prop({ type: Types.ObjectId, ref: 'Lesson', required: true }) lesson_id!: Types.ObjectId ;
  @Prop({ required: true }) title!: string;
  @Prop() description!: string;
  @Prop() max_score!: number;
  @Prop() due_date!: Date ;
  @Prop({ required: true }) type!: string; // 'quiz' or 'code'
}
export const AssignmentSchema = SchemaFactory.createForClass(Assignment);