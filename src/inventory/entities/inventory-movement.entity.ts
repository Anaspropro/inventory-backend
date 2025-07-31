import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Product } from '../../products/entities/product.entity';
import { User } from '../../users/entities/user.entity';

export enum MovementType {
  IN = 'in',
  OUT = 'out',
  ADJUSTMENT = 'adjustment',
  TRANSFER = 'transfer',
}

export enum MovementReason {
  PURCHASE = 'purchase',
  SALE = 'sale',
  RETURN = 'return',
  DAMAGED = 'damaged',
  EXPIRED = 'expired',
  ADJUSTMENT = 'adjustment',
  TRANSFER = 'transfer',
}

@Entity({ name: 'inventory_movements' })
export class InventoryMovement {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'productId' })
  product: Product;

  @Column()
  productId: number;

  @Column({ type: 'enum', enum: MovementType })
  type: MovementType;

  @Column({ type: 'enum', enum: MovementReason })
  reason: MovementReason;

  @Column({ type: 'integer' })
  quantity: number;

  @Column({ type: 'integer' })
  previousQuantity: number;

  @Column({ type: 'integer' })
  newQuantity: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  unitCost: number;

  @Column({ type: 'text', nullable: true })
  reference: string;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ nullable: true })
  userId: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
