import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { SaleItem } from './sale-item.entity';
import { User } from '../../users/entities/user.entity';

export enum SaleStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  REFUNDED = 'refunded',
}

@Entity({ name: 'sales' })
export class Sale {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  saleNumber: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ nullable: true })
  userId: number;

  @Column({ type: 'enum', enum: SaleStatus, default: SaleStatus.PENDING })
  status: SaleStatus;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  subtotal: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  tax: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  discount: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  total: number;

  @Column({ type: 'text', nullable: true })
  customerName: string;

  @Column({ type: 'text', nullable: true })
  customerEmail: string;

  @Column({ type: 'text', nullable: true })
  customerPhone: string;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @OneToMany(() => SaleItem, (saleItem) => saleItem.sale)
  saleItems: SaleItem[];
}
