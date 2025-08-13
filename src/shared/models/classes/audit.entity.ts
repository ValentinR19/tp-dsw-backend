import { Exclude } from 'class-transformer';
import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class AuditEntity {
  @CreateDateColumn({ type: 'timestamp', precision: 0, name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    precision: 0,
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
    nullable: true,
  })
  updatedAt: Date;

  @Exclude()
  @DeleteDateColumn({ type: 'timestamp', precision: 0, name: 'deleted_at', nullable: true, default: null })
  deletedAt: Date | null;
}
