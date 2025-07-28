import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('budget_shipping')
export class BudgetShipping {
  @PrimaryGeneratedColumn({ type: 'decimal', name: 'id' })
  id: number;

  @Column({ type: 'varchar', length: 20, name: 'address' })
  address: string;

  @Column({ type: 'decimal', name: 'city_id' })
  cityId: string;

  @Column({ type: 'decimal', length: 20, name: 'state_id' })
  stateId: string;

  @Column({ type: 'decimal', name: 'country_id' })
  countryId: string;

  @Column({ type: 'varchar', length: 50, name: 'email' })
  email: string;

}