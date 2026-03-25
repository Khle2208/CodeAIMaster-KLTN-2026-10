import { InjectModel } from '@nestjs/mongoose';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';
import { Model } from 'mongoose';
import { CourseDocument } from './entities/course.entity';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CourseLevel } from './enums/courseLevel.enum';
import { CourseStatus } from './enums/courseStatus.enum';
import { NotFoundException } from '@nestjs/common';
import { Category } from '../categories/entities/category.entity';
import { CategoryDocument } from '../categories/entities/category.entity';
import { SearchCourse } from './dto/search-course.dto';
import { filter } from 'rxjs';

@Injectable()
export class CoursesService {
  constructor(
    @InjectModel(Course.name)
    private readonly courseModel: Model<CourseDocument>,

    @InjectModel(Category.name)
    private readonly categoryModel: Model<CategoryDocument>,
  ) {}
  async create(createCourseDto: CreateCourseDto): Promise<Course> {
    const category = await this.categoryModel.findById(
      createCourseDto.category,
    );
    if (!category)
      throw new NotFoundException('Cant search Category in Course');
    const createCourse = await this.courseModel.create({
      ...createCourseDto,
      level: CourseLevel.BEGINNER,
      status: CourseStatus.ACTIVE,
    });
    return createCourse;
  }

  async findAll(): Promise<Course[]> {
    return this.courseModel.find().lean().exec();
  }

  async findOne(id: string): Promise<Course> {
    const course = await this.courseModel.findById(id);
    if (!course) {
      throw new UnauthorizedException('Course not exist');
    }
    return course;
  }

  async update(id: string, updateCourseDto: UpdateCourseDto): Promise<Course> {
    const updated = await this.courseModel.findByIdAndUpdate(
      id,
      updateCourseDto,
      {
        new: true,
        runValidators: true,
      },
    );
    if (!updated) {
      throw new NotFoundException('Course not found');
    }
    return updated;
  }

  async remove(id: string): Promise<void> {
    const result = await this.courseModel.findByIdAndDelete(id);
    if (!result) throw new NotFoundException('Course not found ');
  }


  //Tìm kiếm theo khoá học 
  async searchCourses(search: SearchCourse) {
    // tìm kiếm
    const {
      keyword,
      level,
      category,
      minPrice,
      maxPrice,
      page = 1,
      limit = 10,
    } = search;

    const filter: any = { status: CourseStatus.ACTIVE };

    if (keyword) filter.title = { $regex: keyword, $options: 'i' };

    if (level) filter.level = level;

    if (category) filter.category = category;

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = minPrice;
      if (maxPrice) filter.price.$lte = maxPrice;
    }

    // Phân trang (Pagination)
    const skip = (Number(page) - 1) * Number(limit);

    const data = await this.courseModel
      .find(filter)
      .skip(skip)
      .limit(Number(limit));

    const total = await this.courseModel.countDocuments(filter);

    const sumPage = Math.ceil(total / Number(limit));

    return {
      data,
      page: page,
      limit: limit,
      total,
      sumPage,
    };
  }
}
