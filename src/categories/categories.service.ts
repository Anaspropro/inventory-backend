import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmCrudService } from '@dataui/crud-typeorm';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService extends TypeOrmCrudService<Category> {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {
    super(categoryRepository);
  }
}
