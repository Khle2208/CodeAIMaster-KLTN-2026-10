import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Category, CategoryDocument } from './entities/category.entity';
import { Model } from 'mongoose';
import { ApiResponse } from '@/common/dto/api-response.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name)
    private readonly categoryModel: Model<CategoryDocument>,
  ) {}

  async create(
    createCategoryDto: CreateCategoryDto,
  ): Promise<ApiResponse<Category>> {
    const existing = await this.categoryModel
      .findOne({ categoryName: createCategoryDto.categoryName })
      .lean();

    if (existing) {
      throw new BadRequestException('Category đã tồn tại');
    }

    const newCategory = await this.categoryModel.create(createCategoryDto);

    return new ApiResponse('Tạo thể loại thành công', newCategory.toObject());
  }

  async findAll(): Promise<ApiResponse<Category[]>> {
    const categories = await this.categoryModel.find().lean().exec();

    return new ApiResponse('Danh sách thể loại', categories);
  }

  async findOne(id: string): Promise<ApiResponse<Category>> {
    const category = await this.categoryModel.findById(id).lean().exec();

    if (!category) {
      throw new NotFoundException('Không tìm thấy category');
    }

    return new ApiResponse('Lấy thể loại thành công', category);
  }

  async update(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<ApiResponse<Category>> {
    const updated = await this.categoryModel.findByIdAndUpdate(
      id,
      updateCategoryDto,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updated) {
      throw new NotFoundException('Không tìm thấy category');
    }

    return new ApiResponse('Cập nhật thành công', updated.toObject());
  }

  async remove(id: string): Promise<ApiResponse<null>> {
    const deleted = await this.categoryModel.findByIdAndDelete(id);

    if (!deleted) {
      throw new NotFoundException('Không tìm thấy category');
    }

    return new ApiResponse('Xóa thành công', null);
  }
}
