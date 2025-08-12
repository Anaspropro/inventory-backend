import { Controller } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { Crud, CrudController } from '@dataui/crud';

@Crud({
  model: {
    type: Category,
  },
  dto: {
    create: CreateCategoryDto,
    update: UpdateCategoryDto,
  },
})
@Controller('categories')
export class CategoriesController implements CrudController<Category> {
  constructor(public service: CategoriesService) {}
}