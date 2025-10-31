import { Budget } from '@budgets-module/models/classes/budget.entity';
import { City } from '@main-module/locations/models/classes/city.entity';
import { Country } from '@main-module/locations/models/classes/country.entity';
import { State } from '@main-module/locations/models/classes/state.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('budget_shipping')
export class BudgetShipping {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column({ type: 'varchar', length: 20, name: 'address', nullable: true })
  address: string;

  @Column('int', { name: 'budget_id' })
  budgetId: number;

  @Column({ type: 'mediumint', unsigned: true, name: 'city_id', nullable: true })
  cityId: number;

  @Column({ type: 'mediumint', unsigned: true, name: 'state_id', nullable: true })
  stateId: number;

  @Column({ type: 'mediumint', unsigned: true, name: 'country_id', nullable: true })
  countryId: number;

  @Column({ type: 'varchar', length: 50, name: 'email', nullable: true })
  email: string;

  @OneToOne(() => Budget, (budget) => budget.budgetShipping)
  @JoinColumn({ name: 'budget_id', referencedColumnName: 'id' })
  budget: Budget;

  @ManyToOne(() => City)
  @JoinColumn({ name: 'city_id', referencedColumnName: 'id', foreignKeyConstraintName: 'FK_budget_shipping_city' })
  city: City;

  @ManyToOne(() => State)
  @JoinColumn({ name: 'state_id', referencedColumnName: 'id', foreignKeyConstraintName: 'FK_budget_shipping_state' })
  state: State;

  @ManyToOne(() => Country)
  @JoinColumn({ name: 'country_id', referencedColumnName: 'id', foreignKeyConstraintName: 'FK_budget_shipping_country' })
  country: Country;
}
