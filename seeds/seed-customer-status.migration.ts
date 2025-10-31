import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedCustomerStatus1733940000001 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`SET FOREIGN_KEY_CHECKS = 0;`);
    await queryRunner.query(`TRUNCATE TABLE customer_status;`);
    await queryRunner.query(`
      INSERT INTO customer_status (name, color)
      VALUES
        ('Lead', '#3498db'),
        ('Prospecto', '#f1c40f'),
        ('Cliente', '#2ecc71'),
        ('Inactivo', '#e74c3c');
    `);
    await queryRunner.query(`SET FOREIGN_KEY_CHECKS = 1;`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM customer_status
      WHERE name IN ('Lead', 'Prospecto', 'Cliente', 'Inactivo');
    `);
  }
}
