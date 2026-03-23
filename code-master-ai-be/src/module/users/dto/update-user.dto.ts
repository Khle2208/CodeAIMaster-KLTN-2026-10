import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsNotEmpty } from 'class-validator';

// PartialType giúp kế thừa toàn bộ thuộc tính của CreateUserDto nhưng biến chúng thành không bắt buộc (Optional)
export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsNotEmpty({ message: "ID không được để trống" })
  _id!: string;
}