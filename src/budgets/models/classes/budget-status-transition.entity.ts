import { BudgetStatus } from '@budgets-module/models/classes/budget-status.entity';
import { AuditEntity } from '@shared-module/models/classes/audit.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('budget_status_transition')
export class BudgetStatusTransition extends AuditEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', { name: 'from_status_id' })
  fromStatusId: number;

  @Column('int', { name: 'to_status_id' })
  toStatusId: number;

  @Column('varchar', { name: 'transition_name', length: 100, nullable: true })
  transitionName: string | null;

  @ManyToOne(() => BudgetStatus, (bs) => bs.fromTransitions)
  @JoinColumn({ name: 'from_status_id', referencedColumnName: 'id' })
  fromStatus: BudgetStatus;

  @ManyToOne(() => BudgetStatus, (bs) => bs.toTransitions)
  @JoinColumn({ name: 'to_status_id', referencedColumnName: 'id' })
  toStatus: BudgetStatus;
}
