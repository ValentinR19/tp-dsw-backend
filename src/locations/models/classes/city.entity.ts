import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Country } from './country.entity';
import { State } from './state.entity';

@Entity('cities', { synchronize: false })
export class City {
  @PrimaryGeneratedColumn({ type: 'mediumint', unsigned: true, name: 'id' })
  id: number;

  @Column({ name: 'name', type: 'varchar', length: 255 })
  name: string;

  @Column({ name: 'state_id', type: 'mediumint', unsigned: true })
  stateId: number;

  @Column({ name: 'state_code', type: 'varchar', length: 255 })
  stateCode: string;

  @Column({ name: 'country_id', type: 'mediumint', unsigned: true })
  countryId: number;

  @Column({ name: 'country_code', type: 'char', length: 2 })
  countryCode: string;

  @Column({ name: 'latitude', type: 'decimal', precision: 10, scale: 8 })
  latitude: number;

  @Column({ name: 'longitude', type: 'decimal', precision: 11, scale: 8 })
  longitude: number;

  @ManyToOne(() => State, (state) => state.cities, { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' })
  state: State;

  @ManyToOne(() => Country, (country) => country.cities, { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' })
  country: Country;

  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => "'2014-01-01 12:01:01'",
    precision: 0,
  })
  createdAt: Date;

  @Column({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
    precision: 0,
  })
  updatedAt: Date;

  @Column({ name: 'flag', type: 'tinyint', default: 1 })
  flag: boolean;

  @Column({ name: 'wikiDataId', type: 'varchar', length: 255, nullable: true })
  wikiDataId?: string;
}
