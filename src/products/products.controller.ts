import { Body, Controller, Param } from '@nestjs/common';
import { Crud, CrudController, Override } from '@dataui/crud';

import { Product } from './entities/product.entity';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Crud({
  model: {
    type: Product,
  },
  dto: {
    create: CreateProductDto,
    update: UpdateProductDto,
  },
  query: {
    alwaysPaginate: true,
    join: {
      category: {
        eager: true,
      },
    },
  },
})
@Controller('products')
export class ProductsController implements CrudController<Product> {
  constructor(public service: ProductsService) {}

  // Ensure updates use custom service logic (e.g., updating category relation)
  @Override('updateOneBase')
  async updateOne(@Param('id') id: string, @Body() dto: UpdateProductDto) {
    return this.service.update(Number(id), dto);
  }
}
