import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type PaymentDocument = HydratedDocument<Payment>;

@Schema({ timestamps: true })
export class Payment {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true }) user_id: Types.ObjectId | undefined;
  @Prop({ type: Types.ObjectId, ref: 'Order', required: true }) order_id: Types.ObjectId | undefined;
  @Prop({ required: true }) amount: number | undefined;
  @Prop() payment_method: string | undefined;
  @Prop({ default: 'pending' }) payment_status: string | undefined;
  @Prop() paid_at: Date | undefined;
}
export const PaymentSchema = SchemaFactory.createForClass(Payment);