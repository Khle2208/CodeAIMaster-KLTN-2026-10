import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  // Dùng ? cho các trường có thể bỏ trống
  @Prop() 
  name?: string; 

  @Prop({ unique: true, sparse: true }) 
  username?: string;

  // Dùng ! cho các trường bắt buộc (required: true)
  @Prop({ required: true, unique: true }) 
  email!: string; 

  @Prop()
  password!: string;

  @Prop() 
  avatar?: string;

  @Prop()
  googleId?: string;

  @Prop({ default: 'local' }) // 'local' là đăng ký thường, 'google' là từ Google
  provider?: string;

  @Prop() 
  phone?: string;

  @Prop({ type: Types.ObjectId, ref: 'Role' }) 
  role_id?: Types.ObjectId;

  @Prop({ default: 'active' }) 
  status?: string;
  
  @Prop({ type: String, default: null })
  refreshToken?: string; // Lưu token để đối chiếu

  // CÁC TRƯỜNG DÙNG CHO XÁC THỰC
  @Prop({ default: false })
  isActive!: boolean; 

  @Prop()
  codeId?: string;

  @Prop()
  codeExpired?: Date; 
}

export const UserSchema = SchemaFactory.createForClass(User);