import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedCustomerStatus1733940000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO customer_status (name, color)
      VALUES
        ('Nuevo', '#3498db'),
        ('En contacto', '#f1c40f'),
        ('Cliente', '#2ecc71'),
        ('Inactivo', '#e74c3c');
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM customer_status
      WHERE name IN ('Nuevo', 'En contacto', 'Cliente', 'Inactivo');
    `);
  }
}
