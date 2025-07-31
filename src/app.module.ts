import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { SalesModule } from './sales/sales.module';
import { CategoriesModule } from './categories/categories.module';
import { SuppliersModule } from './suppliers/suppliers.module';
import { OrdersModule } from './orders/orders.module';
import { InventoryModule } from './inventory/inventory.module';
import { ReportsModule } from './reports/reports.module';

@Module({
  imports: [
    DatabaseModule,
    ProductsModule,
    UsersModule,
    SalesModule,
    CategoriesModule,
    SuppliersModule,
    OrdersModule,
    InventoryModule,
    ReportsModule,
  ],
})
export class AppModule {}
