import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { City } from './cities.entity';
import { State } from './states.entity';
@Entity({ name: 'countries' })
export class Country {
  @PrimaryGeneratedColumn({ type: 'mediumint', unsigned: true })
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'char', length: 3, nullable: true })
  iso3: string;

  @Column({ type: 'char', length: 3, nullable: true, name: 'numeric_code' })
  numericCode: string;

  @Column({ type: 'char', length: 2, nullable: true })
  iso2: string;

  @Column({ type: 'varchar', length: 255, nullable: true, name: 'phonecode' })
  phoneCode: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  capital: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  currency: string;

  @Column({ type: 'varchar', length: 255, nullable: true, name: 'currency_name' })
  currencyName: string;

  @Column({ type: 'varchar', length: 255, nullable: true, name: 'currency_symbol' })
  currencySymbol: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  tld: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  native: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  region: string;

  @Column({ type: 'mediumint', unsigned: true, nullable: true, name: 'region_id' })
  idRegion: number;

  @Column({ type: 'varchar', length: 255, nullable: true, name: 'subregion' })
  subregion: string;

  @Column({ type: 'mediumint', unsigned: true, nullable: true, name: 'subregion_id' })
  idSubregion: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  nationality: string;

  @Column({ type: 'text', nullable: true })
  timezones: string;

  @Column({ type: 'text', nullable: true })
  translations: string;

  @Column({ type: 'decimal', precision: 10, scale: 8, nullable: true })
  latitude: number;

  @Column({ type: 'decimal', precision: 11, scale: 8, nullable: true })
  longitude: number;

  @Column({ type: 'varchar', length: 191, nullable: true })
  emoji: string;

  @Column({ type: 'varchar', length: 191, nullable: true })
  emojiU: string;

  @Column({ type: 'timestamp', nullable: true, name: 'created_at' })
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

  @OneToMany(() => City, (city) => city.country)
  cities: City[];

  @OneToMany(() => State, (state) => state.country)
  states: State[];
}
