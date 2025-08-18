import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Product } from './entities/product.entity';
import { TypeOrmCrudService } from '@dataui/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CategoriesService } from '../categories/categories.service';

@Injectable()
export class ProductsService extends TypeOrmCrudService<Product> {
  constructor(
    @InjectRepository(Product) productRepository: Repository<Product>,
    private readonly categoriesService: CategoriesService,
  ) {
    super(productRepository);
  }

  async create(createProductDto: CreateProductDto) {
    // Check if product with same name already exists
    const existingProduct = await this.repo.findOne({
      where: { name: createProductDto.name },
    });

    if (existingProduct) {
      throw new ConflictException(
        `Product with name "${createProductDto.name}" already exists`,
      );
    }

    const category = await this.categoriesService.findOne({
      where: { id: createProductDto.categoryId },
    });

    if (!category) {
      throw new NotFoundException(
        `Category with id ${createProductDto.categoryId} not found`,
      );
    }

    const product = this.repo.create({
      ...createProductDto,
      category,
    });
    return await this.repo.save(product);
  }

  async findAll() {
    return await this.repo.find({
      relations: ['category', 'supplier'],
      order: { name: 'ASC' },
    });
  }

  async findOneWithRelations(id: number) {
    const product = await this.repo.findOne({
      where: { id },
      relations: ['category', 'supplier'],
    });

    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.repo.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    // Check if updating name and if it conflicts with another product
    if (updateProductDto.name && updateProductDto.name !== product.name) {
      const existingProduct = await this.repo.findOne({
        where: { name: updateProductDto.name },
      });

      if (existingProduct) {
        throw new ConflictException(
          `Product with name "${updateProductDto.name}" already exists`,
        );
      }
    }

    const hasCategoryId =
      updateProductDto.categoryId !== undefined &&
      updateProductDto.categoryId !== null &&
      !Number.isNaN(updateProductDto.categoryId as unknown as number);

    if (hasCategoryId) {
      const category = await this.categoriesService.findOne({
        where: { id: updateProductDto.categoryId },
      });
      if (!category) {
        throw new NotFoundException(
          `Category with id ${updateProductDto.categoryId} not found`,
        );
      }
      product.category = category;
    }

    Object.assign(product, updateProductDto);
    return await this.repo.save(product);
  }

  async remove(id: number) {
    const product = await this.repo.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return await this.repo.remove(product);
  }
}
