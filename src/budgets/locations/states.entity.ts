import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Country } from './countries.entity';
import { City } from '../locations/cities.entity';
@Entity({ name: 'states' })
export class State {
  @PrimaryGeneratedColumn({ type: 'mediumint', unsigned: true })
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  // Mapeo explícito del country_id
  @Column({ type: 'mediumint', unsigned: true, name: 'country_id' })
  idCountry: number;

  @Column({ type: 'char', length: 2, name: 'country_code' })
  codeCountry: string;

  @Column({ type: 'varchar', length: 255, nullable: true, name: 'fips_code' })
  flipsCode: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  iso2: string;

  @Column({ type: 'varchar', length: 191, nullable: true })
  type: string;

  @Column({ type: 'int', nullable: true })
  level: number;

  @Column({ type: 'int', nullable: true })
  parent_id: number;

  @Column({ type: 'decimal', precision: 10, scale: 8, nullable: true })
  latitude: number;

  @Column({ type: 'decimal', precision: 11, scale: 8, nullable: true })
  longitude: number;

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

  @ManyToOne(() => Country, (country) => country.states)
  @JoinColumn({ name: 'country_id', referencedColumnName: 'id' })
  country: Country;

  @OneToMany(() => City, (city) => city.state)
  cities: City[];
  }