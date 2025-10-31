import { Budget } from '@budgets-module/models/classes/budget.entity';
import { City } from '@main-module/locations/models/classes/city.entity';
import { Country } from '@main-module/locations/models/classes/country.entity';
import { State } from '@main-module/locations/models/classes/state.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('budget_billing')
export class BudgetBilling {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column({ type: 'int', name: 'budget_id' })
  budgetId: number;

  @Column({ type: 'varchar', length: 20, name: 'buyer_company' })
  buyerCompany: string;

  @Column({ type: 'mediumint', unsigned: true, name: 'city_id', nullable: true })
  cityId: number;

  @Column({ type: 'mediumint', unsigned: true, name: 'state_id', nullable: true })
  stateId: number;

  @Column({ type: 'mediumint', unsigned: true, name: 'country_id', nullable: true })
  countryId: number;
  @Column({ type: 'varchar', length: 20, name: 'buyer_address' })
  buyerAddress: string;

  @Column({ type: 'varchar', name: 'consignee_address' })
  consigneeAddress: string;

  @Column({ type: 'int', name: 'buyer_tax_id' })
  buyerTaxId: number;

  @Column({ type: 'varchar', length: 30, name: 'shipping_country' })
  shippingCountry: string;

  @Column({ type: 'varchar', name: 'port_destination' })
  portDestination: string;

  @Column({ type: 'varchar', length: 50, name: 'payment_description' })
  paymentDescription: string;

  @OneToOne(() => Budget, (budget) => budget.budgetBilling, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'budget_id', referencedColumnName: 'id' })
  budget: Budget;

  @ManyToOne(() => City)
  @JoinColumn({ name: 'city_id', referencedColumnName: 'id', foreignKeyConstraintName: 'FK_budget_billing_city' })
  city: City;

  @ManyToOne(() => State)
  @JoinColumn({ name: 'state_id', referencedColumnName: 'id', foreignKeyConstraintName: 'FK_budget_billing_state' })
  state: State;

  @ManyToOne(() => Country)
  @JoinColumn({ name: 'country_id', referencedColumnName: 'id', foreignKeyConstraintName: 'FK_budget_billing_country' })
  country: Country;
}
