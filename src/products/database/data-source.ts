// backend/src/database/data-source.ts
import { DataSource } from 'typeorm';
import { Product } from '../entities/product.entity';
// import { User } from '../users/entities/user.entity';
// import { Category } from '../categories/entities/category.entity';
// import { Supplier } from '../suppliers/entities/supplier.entity';
// import { Order } from '../orders/entities/order.entity';
// import { OrderItem } from '../orders/entities/order-item.entity';
// import { Sale } from '../sales/entities/sale.entity';
// import { SaleItem } from '../sales/entities/sale-item.entity';
// import { InventoryMovement } from '../inventory/entities/inventory-movement.entity';
// import { Report } from '../reports/entities/report.entity';
import * as dotenv from 'dotenv';
import { Category } from 'src/categories/entities/category.entity';
import { Sale } from 'src/sales/entities/sale.entity';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [
    Product,
    // User,
    Category,
    // Supplier,
    // Order,
    // OrderItem,
    Sale,
    // SaleItem,
    // InventoryMovement,
    // Report,
  ],
  synchronize: true, // Don't use in production
  logging: true,
  ssl: {
    rejectUnauthorized: false,
  },
});
