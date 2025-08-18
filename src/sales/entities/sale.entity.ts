import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SaleStatus } from '../enums/sale-status.enum';

@Entity()
export class Sale {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  saleNumber: string;

  @Column({
    type: 'enum',
    enum: SaleStatus,
    default: SaleStatus.PENDING,
  })
  status: SaleStatus;

  @Column({ nullable: true })
  customerName?: string;

  @Column({ nullable: true })
  customerEmail?: string;

  @Column({ nullable: true })
  customerPhone?: string;

  @Column({ type: 'text', nullable: true })
  notes?: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  subtotal: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  tax: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  discount: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
