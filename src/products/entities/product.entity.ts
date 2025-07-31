import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Category } from '../../categories/entities/category.entity';
import { Supplier } from '../../suppliers/entities/supplier.entity';

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'integer', default: 0 })
  quantity: number;

  @Column({ type: 'integer', default: 0 })
  minQuantity: number;

  @Column({ type: 'integer', default: 0 })
  maxQuantity: number;

  @Column({ type: 'text', nullable: true })
  sku: string;

  @Column({ type: 'text', nullable: true })
  barcode: string;

  @Column({ type: 'text', nullable: true })
  location: string;

  @Column({ type: 'boolean', default: true })
  inStock: boolean;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({ name: 'categoryId' })
  category: Category;

  @Column({ nullable: true })
  categoryId: number;

  @ManyToOne(() => Supplier, (supplier) => supplier.products)
  @JoinColumn({ name: 'supplierId' })
  supplier: Supplier;

  @Column({ nullable: true })
  supplierId: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
