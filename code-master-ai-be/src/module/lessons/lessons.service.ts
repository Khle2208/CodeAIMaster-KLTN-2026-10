import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { Lesson, LessonDocument } from './entities/lesson.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course, CourseDocument } from '../courses/entities/course.entity';

@Injectable()
export class LessonsService {
  constructor(
    @InjectModel(Lesson.name)
    private readonly lessonModel: Model<LessonDocument>,

    @InjectModel(Course.name)
    private readonly courseModel: Model<CourseDocument>,
  ) {}
  async create(createLessonDto: CreateLessonDto): Promise<Lesson> {
    const course = await this.courseModel.findById(createLessonDto.course_id);
    if (!course) throw new UnauthorizedException('Course not found');
    const lesson = await this.lessonModel.create({
      ...createLessonDto,
    });
    return lesson;
  }

  async findAll() {
    return this.lessonModel.find();
  }

  async findOne(id: string): Promise<Lesson> {
    const lesson = await this.lessonModel.findById(id);
    if (!lesson) throw new UnauthorizedException('Not found lesson');
    return lesson;
  }

  async update(id: string, updateLessonDto: UpdateLessonDto): Promise<Lesson> {
    const lesson = await this.lessonModel.findByIdAndUpdate(
      id,
      updateLessonDto,
      { new: true },
    );
    if (!lesson) throw new UnauthorizedException('Not found lesson');
    return lesson;
  }

  async remove(id: string): Promise<void> {
    const result = await this.lessonModel.findByIdAndDelete(id);
    if (!result) throw new UnauthorizedException('Not found lesson');
  }
}
