import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { Supplier } from './entities/supplier.entity';
import { CrudService } from '@dataui/crud';

@Injectable()
export class SuppliersService extends CrudService<Supplier> {
  constructor(
    @InjectRepository(Supplier)
    readonly suppliersRepository: Repository<Supplier>,
  ) {
    super(suppliersRepository);
  }

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

    // Implementing missing methods from CrudService
    async getMany(req: any): Promise<any> {
      return;
    }
  
    async getOne(req: any): Promise<any> {
      return;
    }
  
    async createOne(req: any, dto: any): Promise<any> {
      return;
    }
  
    async createMany(req: any, dto: any): Promise<any> {
      return;
    }
  
    async updateOne(req: any, dto: any): Promise<any> {
      return;
    }
  
    async replaceOne(req: any, dto: any): Promise<any> {
      return;
    }
  
    async deleteOne(req: any): Promise<any> {
      return;
    }
  
    async recoverOne(req: any): Promise<any> {
      return;
    }
}