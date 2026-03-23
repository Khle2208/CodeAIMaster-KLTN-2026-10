import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type SubmissionDocument = HydratedDocument<Submission>;

@Schema({ timestamps: true })
export class Submission {
  @Prop({ type: Types.ObjectId, ref: 'Assignment', required: true }) assignment_id: Types.ObjectId | undefined;
  @Prop({ type: Types.ObjectId, ref: 'User', required: true }) user_id: Types.ObjectId | undefined;
  @Prop({ required: true }) code: string | undefined;
  @Prop({ required: true }) language: string | undefined;
  @Prop({ default: 0 }) score: number | undefined;
  @Prop({ default: 'pending' }) status: string | undefined;
}
export const SubmissionSchema = SchemaFactory.createForClass(Submission);