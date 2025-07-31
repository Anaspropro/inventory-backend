import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Supplier } from '../../suppliers/entities/supplier.entity';
import { OrderItem } from './order-item.entity';

export const OrderStatus = {
  PENDING: 'pending',
  APPROVED: 'approved',
  RECEIVED: 'received',
  CANCELLED: 'cancelled',
} as const;

export type OrderStatusType = (typeof OrderStatus)[keyof typeof OrderStatus];

@Entity({ name: 'orders' })
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  orderNumber: string;

  @ManyToOne(() => Supplier, (supplier) => supplier.orders)
  @JoinColumn({ name: 'supplierId' })
  supplier: Supplier;

  @Column()
  supplierId: number;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.PENDING,
  })
  status!: OrderStatusType;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  totalAmount: number;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @Column({ type: 'timestamp', nullable: true })
  expectedDeliveryDate: Date;

  @Column({ type: 'timestamp', nullable: true })
  receivedDate: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  orderItems: OrderItem[];
}
