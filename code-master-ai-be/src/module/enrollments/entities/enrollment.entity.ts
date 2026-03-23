import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type EnrollmentDocument = HydratedDocument<Enrollment>;

@Schema({ timestamps: true })
export class Enrollment {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true }) user_id: Types.ObjectId | undefined;
  @Prop({ type: Types.ObjectId, ref: 'Course', required: true }) course_id: Types.ObjectId | undefined;
  @Prop({ default: 'active' }) status: string | undefined;
}
export const EnrollmentSchema = SchemaFactory.createForClass(Enrollment);