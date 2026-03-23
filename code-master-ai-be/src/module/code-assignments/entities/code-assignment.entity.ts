import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type CodeAssignmentDocument = HydratedDocument<CodeAssignment>;

@Schema({ timestamps: true })
export class CodeAssignment {
  @Prop({ type: Types.ObjectId, ref: 'Assignment', required: true }) assignment_id: Types.ObjectId | undefined;
  @Prop({ required: true }) problem_description: string | undefined;
  @Prop() input_format: string | undefined;
  @Prop() output_format: string | undefined;
  @Prop() time_limit: number | undefined;
  @Prop() memory_limit: number | undefined;
  @Prop() starter_code: string | undefined;
  @Prop() language_support: string | undefined;
}
export const CodeAssignmentSchema = SchemaFactory.createForClass(CodeAssignment);