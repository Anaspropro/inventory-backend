import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { Supplier } from './entities/supplier.entity';

@Injectable()
export class SuppliersService {
  constructor(
    @InjectRepository(Supplier)
    private suppliersRepository: Repository<Supplier>,
  ) {}

  create(createSupplierDto: CreateSupplierDto) {
    const supplier = this.suppliersRepository.create(createSupplierDto);
    return this.suppliersRepository.save(supplier);
  }

  findAll() {
    return this.suppliersRepository.find();
  }

  findOne(id: number) {
    return this.suppliersRepository.findOneBy({ id });
  }

  async update(id: number, updateSupplierDto: UpdateSupplierDto) {
    await this.suppliersRepository.update(id, updateSupplierDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const supplier = await this.findOne(id);
    if (!supplier) {
      throw new Error('Supplier not found');
    }
    return this.suppliersRepository.remove(supplier);
  }
}
