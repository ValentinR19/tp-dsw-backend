import { Budget } from '@budgets-module/models/classes/budget.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('budget_shipping')
export class BudgetShipping {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column({ type: 'varchar', length: 20, name: 'address' })
  address: string;

  @Column('int', { name: 'budget_id' })
  budgetId: number;

  @Column({ type: 'int', name: 'city_id' })
  cityId: number;

  @Column({ type: 'int', name: 'state_id' })
  stateId: number;

  @Column({ type: 'int', name: 'country_id' })
  countryId: number;

  @Column({ type: 'varchar', length: 50, name: 'email' })
  email: string;

  @OneToOne(() => Budget, (budget) => budget.budgetShipping)
  @JoinColumn({ name: 'budget_id', referencedColumnName: 'id' })
  budget: Budget;
}
