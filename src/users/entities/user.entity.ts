import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: true })
  firstname: string;

  @Column({ type: 'text', nullable: true })
  lastname: string;

  @Column({ type: 'text', nullable: true })
  department: string;

  @Column({ type: 'text', nullable: true })
  role: string;
}
