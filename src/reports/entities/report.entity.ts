import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

export enum ReportType {
  INVENTORY = 'inventory',
  SALES = 'sales',
  PURCHASES = 'purchases',
  MOVEMENTS = 'movements',
  LOW_STOCK = 'low_stock',
  EXPIRY = 'expiry',
}

export enum ReportFormat {
  PDF = 'pdf',
  EXCEL = 'excel',
  CSV = 'csv',
}

@Entity({ name: 'reports' })
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'enum', enum: ReportType })
  type: ReportType;

  @Column({ type: 'enum', enum: ReportFormat })
  format: ReportFormat;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'text', nullable: true })
  parameters: string;

  @Column({ type: 'text', nullable: true })
  filePath: string;

  @Column({ type: 'text', nullable: true })
  fileUrl: string;

  @Column({ type: 'integer', default: 0 })
  fileSize: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ nullable: true })
  userId: number;

  @Column({ type: 'boolean', default: false })
  isGenerated: boolean;

  @Column({ type: 'timestamp', nullable: true })
  generatedAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
