import { City } from '@budgets-module/locations/cities.entity';
import { Country } from '@budgets-module/locations/countries.entity';
import { State } from '@budgets-module/locations/states.entity';
import { Budget } from '@budgets-module/models/classes/budget.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('budget_shipping')
export class BudgetShipping {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column({ type: 'varchar', length: 20, name: 'address', nullable: true })
  address: string;

  @Column('int', { name: 'budget_id' })
  budgetId: number;

  @Column({ type: 'int', name: 'city_id', nullable: true })
  cityId: number;

  @Column({ type: 'int', name: 'state_id', nullable: true })
  stateId: number;

  @Column({ type: 'int', name: 'country_id', nullable: true })
  countryId: number;

  @Column({ type: 'varchar', length: 50, name: 'email', nullable: true })
  email: string;

  @OneToOne(() => Budget, (budget) => budget.budgetShipping)
  @JoinColumn({ name: 'budget_id', referencedColumnName: 'id' })
  budget: Budget;

  @ManyToOne(() => City, { nullable: true })
  @JoinColumn({ name: 'city_id', referencedColumnName: 'id' })
  city: City;

  @ManyToOne(() => State, { nullable: true })
  @JoinColumn({ name: 'state_id', referencedColumnName: 'id' })
  state: State;

  @ManyToOne(() => Country, { nullable: true })
  @JoinColumn({ name: 'country_id', referencedColumnName: 'id' })
  country: Country;
}
