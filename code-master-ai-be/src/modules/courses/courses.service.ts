import { InjectModel } from '@nestjs/mongoose';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';
import { Model } from 'mongoose';
import { CourseDocument } from './entities/course.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CoursesService {
  constructor(
    @InjectModel(Course.name)
    private readonly courseModel: Model<CourseDocument>,
  ) {}
  create(createCourseDto: CreateCourseDto) {
    return 'This action adds a new course';
  }

  async findAll(): Promise<Course[]> {
    return this.courseModel.find().lean().exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} course`;
  }

  update(id: number, updateCourseDto: UpdateCourseDto) {
    return `This action updates a #${id} course`;
  }

  remove(id: number) {
    return `This action removes a #${id} course`;
  }
}
