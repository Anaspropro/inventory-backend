import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Sale } from './entities/sale.entity';
import { TypeOrmCrudService } from '@dataui/crud-typeorm';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../products/entities/product.entity';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { SaleStatus } from './enums/sale-status.enum';

@Injectable()
export class SalesService extends TypeOrmCrudService<Sale> {
  constructor(
    @InjectRepository(Sale) salesRepository: Repository<Sale>,
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {
    super(salesRepository);
  }

  async create(createSaleDto: CreateSaleDto): Promise<Sale> {
    // console.log('Creating sale with data:', createSaleDto);

    try {
      // Validate input
      if (
        !createSaleDto ||
        !createSaleDto.saleItems ||
        createSaleDto.saleItems.length === 0
      ) {
        throw new BadRequestException('Sale must have at least one item');
      }

      // Validate stock levels before creating sale
      for (const item of createSaleDto.saleItems) {
        const product = await this.productRepository.findOne({
          where: { id: item.productId },
        });
        if (!product) {
          throw new NotFoundException(
            `Product with id ${item.productId} not found`,
          );
        }
        if (product.quantity < item.quantity) {
          throw new BadRequestException(
            `Insufficient stock for product ${product.name}. Available: ${product.quantity}, Requested: ${item.quantity}`,
          );
        }
      }

      // Generate a unique sale number
      const saleNumber = `SALE-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;

      // Create the sale (exclude saleItems from the main entity to avoid cascade issues)
      const { saleItems, ...saleData } = createSaleDto;
      const sale = this.repo.create({
        ...saleData,
        saleNumber,
        status: SaleStatus.PENDING,
      });

      const savedSale = await this.repo.save(sale);

      // Update stock levels for each product
      for (const item of saleItems) {
        const product = await this.productRepository.findOne({
          where: { id: item.productId },
        });
        if (product) {
          product.quantity -= item.quantity;
          await this.productRepository.save(product);
        }
      }

      // Return the created sale with items
      const result = await this.findOneWithRelations(savedSale.id);
      return result;
    } catch (error) {
      console.error('Error creating sale:', error);
      throw error;
    }
  }

  async findAllWithRelations() {
    return this.repo.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findOneWithRelations(id: number) {
    const sale = await this.repo.findOne({
      where: { id },
    });

    if (!sale) {
      throw new NotFoundException(`Sale with id ${id} not found`);
    }

    return sale;
  }

  async update(id: number, updateSaleDto: UpdateSaleDto): Promise<Sale> {
    // console.log('Updating sale with ID:', id, 'Data:', updateSaleDto);

    try {
      // Find the existing sale
      const existingSale = await this.findOneWithRelations(id);

      if (!existingSale) {
        throw new NotFoundException(`Sale with id ${id} not found`);
      }

      // Validate that we're not trying to update a sale that's already completed
      if (existingSale.status === SaleStatus.COMPLETED) {
        throw new BadRequestException('Cannot modify a completed sale');
      }

      // Update only the provided fields
      const updateResult = await this.repo.update(id, updateSaleDto);

      if (updateResult.affected === 0) {
        throw new BadRequestException('Failed to update sale');
      }

      // Return the updated sale
      const updatedSale = await this.findOneWithRelations(id);
      // console.log('Sale updated successfully:', updatedSale);
      return updatedSale;
    } catch (error) {
      console.error('Error updating sale:', error);

      // Re-throw known exceptions
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }

      // Handle any other errors
      throw new BadRequestException('Failed to update sale');
    }
  }

  async remove(id: number) {
    // Check if sale exists
    const sale = await this.repo.findOne({ where: { id } });
    if (!sale) {
      throw new NotFoundException(`Sale with id ${id} not found`);
    }

    // Then delete the sale
    return this.repo.delete(id);
  }
}
