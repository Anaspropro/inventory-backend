import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Product } from '../products/entities/product.entity';
import { Sale } from '../sales/entities/sale.entity';
import { Category } from '../categories/entities/category.entity';
// import { User } from '../users/entities/user.entity';
// import { Supplier } from '../suppliers/entities/supplier.entity';
// import { Order } from '../orders/entities/order.entity';
// import { OrderItem } from '../orders/entities/order-item.entity';
// import { InventoryMovement } from '../inventory/entities/inventory-movement.entity';
// import { Report } from '../reports/entities/report.entity';
import * as dotenv from 'dotenv';

dotenv.config();
@Module({
  imports: [
    ConfigModule.forRoot(), // Loads .env automatically
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [
        Product,
        Sale,
        Category,
        // User,
        // Supplier,
        // Order,
        // OrderItem,
        // InventoryMovement,
        // Report,
      ],
      synchronize: true,
      ssl: {
        rejectUnauthorized: false,
      },
    }),
  ],
})
export class DatabaseModule {}
