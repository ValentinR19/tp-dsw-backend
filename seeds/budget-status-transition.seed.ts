import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedBudgetStatusAndTransitions1730412100003 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`SET FOREIGN_KEY_CHECKS = 0;`);
    await queryRunner.query(`TRUNCATE TABLE budget_status_transition;`);
    await queryRunner.query(`TRUNCATE TABLE budget_status;`);

    // Insertar estados base
    await queryRunner.query(`
      INSERT INTO budget_status (id, name, color) VALUES
      (1, 'Solicitado', '#2196F3'),
      (2, 'Autorizado', '#4CAF50'),
      (3, 'Confirmado', '#009688'),
      (4, 'Anulado', '#F44336'),
      (5, 'Entregado', '#FF9800');
    `);

    // Insertar transiciones válidas
    await queryRunner.query(`
      INSERT INTO budget_status_transition (from_status_id, to_status_id, transition_name)
      VALUES
        (1, 2, 'Autorizar'),
        (2, 3, 'Confirmar'),
        (3, 5, 'Finalizar'),
        (1, 4, 'Anular'),
        (2, 4, 'Anular'),
        (3, 4, 'Anular');
    `);

    await queryRunner.query(`SET FOREIGN_KEY_CHECKS = 1;`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`SET FOREIGN_KEY_CHECKS = 0;`);
    await queryRunner.query(`TRUNCATE TABLE budget_status_transition;`);
    await queryRunner.query(`TRUNCATE TABLE budget_status;`);
    await queryRunner.query(`SET FOREIGN_KEY_CHECKS = 1;`);
  }
}
