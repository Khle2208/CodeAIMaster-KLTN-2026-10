import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type QuestionDocument = HydratedDocument<Question>;

@Schema({ timestamps: true })
export class Question {
  @Prop({ type: Types.ObjectId, ref: 'Quiz', required: true }) quiz_id: Types.ObjectId | undefined;
  @Prop({ required: true }) question_text: string | undefined;
  @Prop() option_a: string | undefined;
  @Prop() option_b: string | undefined;
  @Prop() option_c: string | undefined;
  @Prop() option_d: string | undefined;
  @Prop({ required: true }) correct_answer: string | undefined;
  @Prop() score: number | undefined;
}
export const QuestionSchema = SchemaFactory.createForClass(Question);