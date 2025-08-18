import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@dataui/crud';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Crud({
  model: {
    type: Category,
  },
  dto: {
    create: CreateCategoryDto,
    update: UpdateCategoryDto,
  },
  serialize: {
    get: Category,
    getMany: Category,
  },
  routes: {
    exclude: [],
  },
  query: {
    maxLimit: 100,
    cache: 2000,
  },
})
@ApiTags('categories')
@Controller('categories')
export class CategoriesController implements CrudController<Category> {
  constructor(public service: CategoriesService) {}
}
