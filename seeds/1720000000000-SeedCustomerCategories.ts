import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedCustomerCategories1720000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO customer_category (name, active)
      VALUES
        ('Particular', true),
        ('Empresa PyME', true),
        ('Corporativo', true),
        ('Distribuidor', true),
        ('Proveedor', true),
        ('Potencial', true),
        ('Inactivo', false);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM customer_category
      WHERE name IN (
        'Particular',
        'Empresa PyME',
        'Corporativo',
        'Distribuidor',
        'Proveedor',
        'Potencial',
        'Inactivo'
      );
    `);
  }
}
