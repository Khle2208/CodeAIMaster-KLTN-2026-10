import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type OrderDocument = HydratedDocument<Order>;

@Schema({ timestamps: true })
export class Order {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true }) user_id: Types.ObjectId | undefined;
  @Prop({ required: true }) total_price: number | undefined;
  @Prop({ default: 'pending' }) status: string | undefined;
}
export const OrderSchema = SchemaFactory.createForClass(Order);