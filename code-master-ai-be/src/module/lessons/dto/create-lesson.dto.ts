import {
  IsString,
  IsOptional,
  IsNumber,
  IsMongoId,
  Min,
} from 'class-validator';

export class CreateLessonDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsString()
  video_url?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  lesson_order?: number;

  @IsMongoId()
  course_id: string;
}
