import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type QuizDocument = HydratedDocument<Quiz>;

@Schema({ timestamps: true })
export class Quiz {
  @Prop({ type: Types.ObjectId, ref: 'Assignment', required: true }) assignment_id: Types.ObjectId | undefined;
  @Prop({ required: true }) title: string | undefined;
  @Prop() time_limit: number | undefined;
  @Prop() total_score: number | undefined;
}
export const QuizSchema = SchemaFactory.createForClass(Quiz);