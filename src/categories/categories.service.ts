import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { CrudService } from '@dataui/crud';

@Injectable()
export class CategoriesService extends CrudService<Category> {
  constructor(
    @InjectRepository(Category)
    readonly categoryRepository: Repository<Category>,
  ) {
    super(categoryRepository);
  }

  async create(createCategoryDto: CreateCategoryDto) {
    // Check if category with same name already exists
    const existingCategory = await this.categoryRepository.findOne({
      where: { name: createCategoryDto.name },
    });

    if (existingCategory) {
      throw new ConflictException(
        `Category with name "${createCategoryDto.name}" already exists`,
      );
    }

    const category = this.categoryRepository.create(createCategoryDto);
    return await this.categoryRepository.save(category);
  }

  findAll() {
    return this.categoryRepository.find({
      where: { isActive: true },
      order: { name: 'ASC' },
    });
  }

  async findOne(id: number) {
    const category = await this.categoryRepository.findOne({
      where: { id },
      relations: ['products'],
    });

    if (!category) {
      throw new Error(`Category with id ${id} not found`);
    }

    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.findOne(id);

    // Check if updating name and if it conflicts with another category
    if (updateCategoryDto.name && updateCategoryDto.name !== category.name) {
      const existingCategory = await this.categoryRepository.findOne({
        where: { name: updateCategoryDto.name },
      });

      if (existingCategory) {
        throw new ConflictException(
          `Category with name "${updateCategoryDto.name}" already exists`,
        );
      }
    }

    Object.assign(category, updateCategoryDto);
    return await this.categoryRepository.save(category);
  }

  async remove(id: number) {
    const category = await this.findOne(id);

    // Check if category has products
    if (category.products && category.products.length > 0) {
      throw new Error(
        `Cannot delete category "${category.name}" because it has ${category.products.length} associated products`,
      );
    }

    return await this.categoryRepository.remove(category);
  }

    // Implementing missing methods from CrudService
    async getMany(req: any): Promise<any> {
      return;
    }
  
    async getOne(req: any): Promise<any> {
      return;
    }
  
    async createOne(req: any, dto: any): Promise<any> {
      return;
    }
  
    async createMany(req: any, dto: any): Promise<any> {
      return;
    }
  
    async updateOne(req: any, dto: any): Promise<any> {
      return;
    }
  
    async replaceOne(req: any, dto: any): Promise<any> {
      return;
    }
  
    async deleteOne(req: any): Promise<any> {
      return;
    }
  
    async recoverOne(req: any): Promise<any> {
      return;
    }
}