import { Country } from '@main-module/locations/models/classes/country.entity';
import { Region } from '@main-module/locations/models/classes/region.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('subregions', { synchronize: false })
export class Subregion {
  @PrimaryGeneratedColumn({ type: 'mediumint', unsigned: true, name: 'id' })
  id: number;

  @Column({ name: 'name', type: 'varchar', length: 100 })
  name: string;

  @Column({ name: 'translations', type: 'text', nullable: true })
  translations?: string;

  @Column({ name: 'region_id', type: 'mediumint', unsigned: true })
  regionId: number;

  @ManyToOne(() => Region, (region) => region.subregions, { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' })
  @JoinColumn([{ name: 'region_id', referencedColumnName: 'id' }])
  region: Region;

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

  @OneToMany(() => Country, (country) => country.subregionRelation)
  countries: Country[];
}
