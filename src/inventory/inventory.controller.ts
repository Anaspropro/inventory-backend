import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { CreateInventoryMovementDto } from './dto/create-inventory-movement.dto';
import { UpdateInventoryMovementDto } from './dto/update-inventory-movement.dto';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Post()
  create(@Body() createInventoryMovementDto: CreateInventoryMovementDto) {
    return this.inventoryService.create(createInventoryMovementDto);
  }

  @Get()
  findAll() {
    return this.inventoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.inventoryService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateInventoryMovementDto: UpdateInventoryMovementDto,
  ) {
    return this.inventoryService.update(+id, updateInventoryMovementDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.inventoryService.remove(+id);
  }
}
