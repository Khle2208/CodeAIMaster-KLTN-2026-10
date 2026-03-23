import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type TestCaseDocument = HydratedDocument<TestCase>;

@Schema({ timestamps: true })
export class TestCase {
  @Prop({ type: Types.ObjectId, ref: 'CodeAssignment', required: true }) code_assignment_id: Types.ObjectId | undefined;
  @Prop({ required: true }) input_data: string | undefined;
  @Prop({ required: true }) expected_output: string | undefined;
  @Prop({ default: false }) is_hidden: boolean | undefined;
}
export const TestCaseSchema = SchemaFactory.createForClass(TestCase);