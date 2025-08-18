import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ProductsModule } from './products/products.module';
import { DatabaseModule } from './products/database/database.module';
import { SalesModule } from './sales/sales.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    ProductsModule,
    SalesModule,
    CategoriesModule,
    // UsersModule,
    // SuppliersModule,
    // OrdersModule,
    // InventoryModule,
    // ReportsModule,
  ],
})
export class AppModule {}
