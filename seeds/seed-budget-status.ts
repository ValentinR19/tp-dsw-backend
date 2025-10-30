import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedBudgetStatus1733940100000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO budget_status (name, color)
      VALUES
        ('Pendiente', '#f1c40f'),
        ('Aprobado', '#2ecc71'),
        ('Rechazado', '#e74c3c'),
        ('En revisión', '#3498db');
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM budget_status
      WHERE name IN ('Pendiente', 'Aprobado', 'Rechazado', 'En revisión');
    `);
  }
}
