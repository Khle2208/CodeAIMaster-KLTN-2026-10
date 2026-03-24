import { Lesson } from '@/module/lessons/entities/lesson.entity';
import { Course } from '../entities/course.entity';

export interface CourseDetailResponse {
  course: Course;
  lessons: Lesson[];
}
