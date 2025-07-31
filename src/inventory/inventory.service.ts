import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateInventoryMovementDto } from './dto/create-inventory-movement.dto';
import { UpdateInventoryMovementDto } from './dto/update-inventory-movement.dto';
import { InventoryMovement } from './entities/inventory-movement.entity';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(InventoryMovement)
    private inventoryMovementRepository: Repository<InventoryMovement>,
  ) {}

  create(createInventoryMovementDto: CreateInventoryMovementDto) {
    const inventoryMovement = this.inventoryMovementRepository.create(
      createInventoryMovementDto,
    );
    return this.inventoryMovementRepository.save(inventoryMovement);
  }

  findAll() {
    return this.inventoryMovementRepository.find();
  }

  findOne(id: number) {
    return this.inventoryMovementRepository.findOneBy({ id });
  }

  async update(
    id: number,
    updateInventoryMovementDto: UpdateInventoryMovementDto,
  ) {
    await this.inventoryMovementRepository.update(
      id,
      updateInventoryMovementDto,
    );
    return this.findOne(id);
  }

  async remove(id: number) {
    const inventoryMovement = await this.findOne(id);
    if (!inventoryMovement) {
      throw new Error('Inventory movement not found');
    }
    return this.inventoryMovementRepository.remove(inventoryMovement);
  }
}
