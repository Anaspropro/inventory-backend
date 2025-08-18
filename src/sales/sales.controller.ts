import { Body, Controller } from '@nestjs/common';
import { SalesService } from './sales.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { Sale } from './entities/sale.entity';
import { Crud, CrudController, Override } from '@dataui/crud';

@Crud({
  model: {
    type: Sale,
  },
  dto: {
    create: CreateSaleDto,
    update: UpdateSaleDto,
  },
  query: {
    alwaysPaginate: true,
  },
})
@Controller('sales')
export class SalesController implements CrudController<Sale> {
  constructor(public service: SalesService) {}

  // Override the default createOneBase to use custom business logic in the service.
  // This avoids attempting to persist `saleItems` directly on the Sale entity (no such column),
  // and ensures stock checks and updates are performed.
  @Override('createOneBase')
  async createOne(@Body() dto: CreateSaleDto) {
    return this.service.create(dto);
  }
}
