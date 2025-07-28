import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn({ type: 'decimal', name: 'id' })
  id: number;

  @Column({ type: 'varchar', length: 20, name: 'name' })
  name: string;

  @Column({ type: 'boolean', name: 'active' })
  active: string;

  @Column({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @Column({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;

  @Column({ type: 'timestamp', name: 'deleted_at', nullable: true })
  deletedAt: Date;
}