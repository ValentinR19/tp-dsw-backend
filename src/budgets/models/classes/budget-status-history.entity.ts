import { BudgetStatus } from '@budgets-module/models/classes/budget-status.entity';
import { Budget } from '@budgets-module/models/classes/budget.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'budget_status_history' })
export class BudgetStatusHistory {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @ManyToOne(() => Budget, (budget) => budget.statusHistory)
  budget: Budget;

  @Column({ type: 'int', name: 'budget_id' })
  budgetId: number;

  @ManyToOne(() => BudgetStatus, (status) => status.history)
  status: BudgetStatus;

  @Column({ type: 'int', name: 'status_id' })
  statusId: number;

  @Column({ type: 'int', name: 'user_id' })
  userId: number;

  @Column({ type: 'timestamp', precision: 0, name: 'changed_at' })
  changedAt: Date;

  @Column({ type: 'boolean', name: 'is_reverted' })
  isReverted: boolean;
}
