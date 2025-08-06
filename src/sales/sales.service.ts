import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { Sale, SaleStatus } from './entities/sale.entity';
import { SaleItem } from './entities/sale-item.entity';
import { Product } from '../products/entities/product.entity';

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(Sale)
    private saleRepository: Repository<Sale>,
    @InjectRepository(SaleItem)
    private saleItemRepository: Repository<SaleItem>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async create(createSaleDto: CreateSaleDto) {
    console.log('Creating sale with data:', createSaleDto);

    try {
      // Validate stock levels before creating sale
      if (createSaleDto.saleItems && Array.isArray(createSaleDto.saleItems)) {
        for (const item of createSaleDto.saleItems) {
          const product = await this.productRepository.findOne({
            where: { id: item.productId },
          });
          if (!product) {
            throw new Error(`Product with id ${item.productId} not found`);
          }
          if (product.quantity < item.quantity) {
            throw new Error(
              `Insufficient stock for product ${product.name}. Available: ${product.quantity}, Requested: ${item.quantity}`,
            );
          }
        }
      }

      // Generate a unique sale number
      const saleNumber = `SALE-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

      // Create the sale
      const sale = this.saleRepository.create({
        ...createSaleDto,
        saleNumber,
        status: SaleStatus.PENDING,
      });

      console.log('Created sale entity:', sale);
      const savedSale = await this.saleRepository.save(sale);
      console.log('Saved sale:', savedSale);

      // Create sale items and update stock levels
      if (
        createSaleDto.saleItems &&
        Array.isArray(createSaleDto.saleItems) &&
        createSaleDto.saleItems.length > 0
      ) {
        const saleItems = createSaleDto.saleItems
          .map((item) =>
            this.saleItemRepository.create({
              ...item,
              saleId: savedSale.id,
            }),
          )
          .flat();

        console.log('Creating sale items:', saleItems);
        await this.saleItemRepository.save(saleItems);

        // Update stock levels for each product
        for (const item of createSaleDto.saleItems) {
          const product = await this.productRepository.findOne({
            where: { id: item.productId },
          });
          if (product) {
            product.quantity -= item.quantity;
            await this.productRepository.save(product);
            console.log(
              `Updated stock for product ${product.name}: ${product.quantity + item.quantity} -> ${product.quantity}`,
            );
          }
        }
      }

      // Return the created sale with items
      const result = await this.findOne(savedSale.id);
      console.log('Returning sale result:', result);
      return result;
    } catch (error) {
      console.error('Error creating sale:', error);
      throw error;
    }
  }

  async findAll() {
    return this.saleRepository.find({
      relations: ['saleItems', 'saleItems.product'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number) {
    return this.saleRepository.findOne({
      where: { id },
      relations: ['saleItems', 'saleItems.product'],
    });
  }

  async update(id: number, updateSaleDto: UpdateSaleDto) {
    try {
      console.log('Updating sale with data:', updateSaleDto);

      // Find the existing sale
      const existingSale = await this.findOne(id);
      if (!existingSale) {
        throw new Error(`Sale with id ${id} not found`);
      }

      // Update the sale
      await this.saleRepository.update(id, updateSaleDto);

      // Return the updated sale
      const updatedSale = await this.findOne(id);
      console.log('Sale updated successfully:', updatedSale);
      return updatedSale;
    } catch (error) {
      console.error('Error updating sale:', error);
      throw error;
    }
  }

  async remove(id: number) {
    // Delete sale items first
    await this.saleItemRepository.delete({ saleId: id });
    // Then delete the sale
    return this.saleRepository.delete(id);
  }
}
