import { City } from '@main-module/locations/models/classes/city.entity';
import { Region } from '@main-module/locations/models/classes/region.entity';
import { State } from '@main-module/locations/models/classes/state.entity';
import { Subregion } from '@main-module/locations/models/classes/subregion.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('countries', { synchronize: false })
export class Country {
  @PrimaryGeneratedColumn({ type: 'mediumint', unsigned: true, name: 'id' })
  id: number;

  @Column({ name: 'name', type: 'varchar', length: 100 })
  name: string;

  @Column({ name: 'iso3', type: 'char', length: 3, nullable: true })
  iso3?: string;

  @Column({ name: 'numeric_code', type: 'char', length: 3, nullable: true })
  numericCode?: string;

  @Column({ name: 'iso2', type: 'char', length: 2, nullable: true })
  iso2?: string;

  @Column({ name: 'phonecode', type: 'varchar', length: 255, nullable: true })
  phonecode?: string;

  @Column({ name: 'capital', type: 'varchar', length: 255, nullable: true })
  capital?: string;

  @Column({ name: 'currency', type: 'varchar', length: 255, nullable: true })
  currency?: string;

  @Column({ name: 'currency_name', type: 'varchar', length: 255, nullable: true })
  currencyName?: string;

  @Column({ name: 'currency_symbol', type: 'varchar', length: 255, nullable: true })
  currencySymbol?: string;

  @Column({ name: 'tld', type: 'varchar', length: 255, nullable: true })
  tld?: string;

  @Column({ name: 'native', type: 'varchar', length: 255, nullable: true })
  native?: string;

  @Column({ name: 'region', type: 'varchar', length: 255, nullable: true })
  region?: string;

  @Column({ name: 'region_id', type: 'mediumint', unsigned: true, nullable: true })
  regionId?: number;

  @Column({ name: 'subregion', type: 'varchar', length: 255, nullable: true })
  subregion?: string;

  @Column({ name: 'subregion_id', type: 'mediumint', unsigned: true, nullable: true })
  subregionId?: number;

  @ManyToOne(() => Region, (region) => region.countries, { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' })
  @JoinColumn([{ name: 'region_id', referencedColumnName: 'id' }])
  regionRelation: Region;

  @ManyToOne(() => Subregion, (subregion) => subregion.countries, { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' })
  @JoinColumn([{ name: 'subregion_id', referencedColumnName: 'id' }])
  subregionRelation: Subregion;

  @Column({ name: 'nationality', type: 'varchar', length: 255, nullable: true })
  nationality?: string;

  @Column({ name: 'timezones', type: 'text', nullable: true })
  timezones?: string;

  @Column({ name: 'translations', type: 'text', nullable: true })
  translations?: string;

  @Column({ name: 'latitude', type: 'decimal', precision: 10, scale: 8, nullable: true })
  latitude?: number;

  @Column({ name: 'longitude', type: 'decimal', precision: 11, scale: 8, nullable: true })
  longitude?: number;

  @Column({ name: 'emoji', type: 'varchar', length: 191, nullable: true })
  emoji?: string;

  @Column({ name: 'emojiU', type: 'varchar', length: 191, nullable: true })
  emojiU?: string;

  @Column({ name: 'created_at', precision: 0, type: 'timestamp', nullable: true })
  createdAt?: Date;

  @Column({
    name: 'updated_at',
    type: 'timestamp',
    precision: 0,
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @Column({ name: 'flag', type: 'tinyint', default: 1 })
  flag: boolean;

  @Column({ name: 'wikiDataId', type: 'varchar', length: 255, nullable: true })
  wikiDataId?: string;

  @OneToMany(() => State, (state) => state.country)
  states: State[];

  @OneToMany(() => City, (city) => city.country)
  cities: City[];
}
