import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
  ) {}

  create(createOrderDto: CreateOrderDto) {
    const order = this.ordersRepository.create(createOrderDto);
    return this.ordersRepository.save(order);
  }

  findAll() {
    return this.ordersRepository.find();
  }

  findOne(id: number) {
    return this.ordersRepository.findOneBy({ id });
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    await this.ordersRepository.update(id, updateOrderDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const order = await this.findOne(id);
    if (!order) {
      throw new Error('Order not found');
    }
    return this.ordersRepository.remove(order);
  }
}
