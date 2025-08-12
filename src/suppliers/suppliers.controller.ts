import { Controller } from '@nestjs/common';
import { SuppliersService } from './suppliers.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { Supplier } from './entities/supplier.entity';
import { Crud, CrudController } from '@dataui/crud';

@Crud({
  model: {
    type: Supplier,
  },
  dto: {
    create: CreateSupplierDto,
    update: UpdateSupplierDto,
  },
})
@Controller('suppliers')
export class SuppliersController implements CrudController<Supplier> {
  constructor(public service: SuppliersService) {}
}