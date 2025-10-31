import { Country } from '@main-module/locations/models/classes/country.entity';
import { Subregion } from '@main-module/locations/models/classes/subregion.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('regions', { synchronize: false })
export class Region {
  @PrimaryGeneratedColumn({ type: 'mediumint', unsigned: true, name: 'id' })
  id: number;

  @Column({ name: 'name', type: 'varchar', length: 100 })
  name: string;

  @Column({ name: 'translations', type: 'text', nullable: true })
  translations?: string;

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

  @OneToMany(() => Subregion, (subregion) => subregion.region)
  subregions: Subregion[];

  @OneToMany(() => Country, (country) => country.regionRelation)
  countries: Country[];
}
