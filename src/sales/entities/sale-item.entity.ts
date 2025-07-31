import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Sale } from './sale.entity';
import { Product } from '../../products/entities/product.entity';

@Entity({ name: 'sale_items' })
export class SaleItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Sale, (sale) => sale.saleItems)
  @JoinColumn({ name: 'saleId' })
  sale: Sale;

  @Column()
  saleId: number;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'productId' })
  product: Product;

  @Column()
  productId: number;

  @Column({ type: 'integer' })
  quantity: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  unitPrice: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  totalPrice: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  discount: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
