import { BudgetStatusHistory } from '@budgets-module/models/classes/budget-status-history.entity';
import { BudgetStatusTransition } from '@budgets-module/models/classes/budget-status-transition.entity';
import { Budget } from '@budgets-module/models/classes/budget.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'budget_status' })
export class BudgetStatus {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column({ type: 'varchar', name: 'name' })
  name: string;

  @Column({ type: 'varchar', name: 'color' })
  color: string;

  @OneToMany(() => BudgetStatusHistory, (history) => history.status)
  history: BudgetStatusHistory[];

  @OneToMany(() => Budget, (budget) => budget.status)
  budgets: Budget[];

  @OneToMany(() => BudgetStatusTransition, (bst) => bst.fromStatus)
  fromTransitions: BudgetStatusTransition[];

  @OneToMany(() => BudgetStatusTransition, (bst) => bst.toStatus)
  toTransitions: BudgetStatusTransition[];
}
