import { DataSource } from 'typeorm';
import { Product } from '../products/entities/product.entity';
import * as dotenv from 'dotenv';
import { Category } from 'src/categories/entities/category.entity';
import { Sale } from 'src/sales/entities/sale.entity';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [Product, Category, Sale],
  synchronize: true, // Don't use in production
  logging: true,
  ssl: {
    rejectUnauthorized: false,
  },
});
