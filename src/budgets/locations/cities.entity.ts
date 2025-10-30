 import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { State } from './states.entity';
import { Country } from './countries.entity';
 @Entity({ name: 'cities' })
export class City {
  @PrimaryGeneratedColumn({ type: 'mediumint', unsigned: true })
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  // Mapeo explícito del state_id
  @Column({ type: 'mediumint', unsigned: true, name: 'state_id' })
  idState: number;

  @Column({ type: 'varchar', length: 255, name: 'state_code' })
  stateCode: string;

  // Mapeo explícito del country_id
  @Column({ type: 'mediumint', unsigned: true, name: 'country_id' })
  idCountry: number;

  @Column({ type: 'char', length: 2, name: 'country_code' })
  countryCode: string;

  @Column({ type: 'decimal', precision: 10, scale: 8 })
  latitude: number;

  @Column({ type: 'decimal', precision: 11, scale: 8 })
  longitude: number;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'created_at',
  })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
    name: 'updated_at',
  })
  updatedAt: Date;

  @Column({ type: 'tinyint', width: 1, default: 1 })
  flag: boolean;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    comment: 'Rapid API GeoDB Cities',
  })
  wikiDataId: string;

  // Relaciones
  @ManyToOne(() => State, (state) => state.cities)
  @JoinColumn({ name: 'state_id', referencedColumnName: 'id' })
  state: State;

  @ManyToOne(() => Country, (country) => country.cities)
  @JoinColumn({ name: 'country_id', referencedColumnName: 'id' })
  country: Country;

}