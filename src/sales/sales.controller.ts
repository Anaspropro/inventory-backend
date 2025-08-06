import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
} from '@nestjs/common';
import { SalesService } from './sales.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';

@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Post()
  async create(@Body() createSaleDto: CreateSaleDto) {
    try {
      // Validate that saleItems is provided and not empty
      if (!createSaleDto.saleItems || createSaleDto.saleItems.length === 0) {
        throw new BadRequestException('Sale items are required');
      }

      const result = await this.salesService.create(createSaleDto);
      return result;
    } catch (error: any) {
      console.error('Error in sales controller:', error);
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException('Failed to create sale');
    }
  }

  @Get()
  findAll() {
    return this.salesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.salesService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateSaleDto: UpdateSaleDto) {
    try {
      const result = await this.salesService.update(+id, updateSaleDto);
      return result;
    } catch (error: any) {
      console.error('Error in sales controller update:', error);
      throw error;
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.salesService.remove(+id);
  }
}
