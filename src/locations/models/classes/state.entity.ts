import { City } from '@main-module/locations/models/classes/city.entity';
import { Country } from '@main-module/locations/models/classes/country.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('states', { synchronize: false })
export class State {
  @PrimaryGeneratedColumn({ type: 'mediumint', unsigned: true, name: 'id' })
  id: number;

  @Column({ name: 'name', type: 'varchar', length: 255 })
  name: string;

  @Column({ name: 'country_id', type: 'mediumint', unsigned: true })
  countryId: number;

  @Column({ name: 'country_code', type: 'char', length: 2 })
  countryCode: string;

  @Column({ name: 'fips_code', type: 'varchar', length: 255, nullable: true })
  fipsCode?: string;

  @Column({ name: 'iso2', type: 'varchar', length: 255, nullable: true })
  iso2?: string;

  @Column({ name: 'type', type: 'varchar', length: 191, nullable: true })
  type?: string;

  @Column({ name: 'level', type: 'int', nullable: true })
  level?: number;

  @Column({ name: 'parent_id', type: 'int', nullable: true })
  parentId?: number;

  @Column({ name: 'latitude', type: 'decimal', precision: 10, scale: 8, nullable: true })
  latitude?: number;

  @Column({ name: 'longitude', type: 'decimal', precision: 11, scale: 8, nullable: true })
  longitude?: number;

  @ManyToOne(() => Country, (country) => country.states, { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' })
  country: Country;

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

  @OneToMany(() => City, (city) => city.state)
  cities: City[];
}
