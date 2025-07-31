// backend/src/database/data-source.ts
import { DataSource } from 'typeorm';
import { Product } from '../products/entities/product.entity';
import { User } from '../users/entities/user.entity';
import { Category } from '../categories/entities/category.entity';
import { Supplier } from '../suppliers/entities/supplier.entity';
import { Order } from '../orders/entities/order.entity';
import { OrderItem } from '../orders/entities/order-item.entity';
import { Sale } from '../sales/entities/sale.entity';
import { SaleItem } from '../sales/entities/sale-item.entity';
import { InventoryMovement } from '../inventory/entities/inventory-movement.entity';
import { Report } from '../reports/entities/report.entity';
import * as dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME || 'webwiz',
  password: process.env.DB_PASSWORD || 'Web$wiZ',
  database: process.env.DB_NAME || 'inventory_db',
  entities: [
    Product,
    User,
    Category,
    Supplier,
    Order,
    OrderItem,
    Sale,
    SaleItem,
    InventoryMovement,
    Report,
  ],
  synchronize: true, // Don't use in production
  logging: true,
});
