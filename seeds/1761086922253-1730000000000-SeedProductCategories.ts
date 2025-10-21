import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedProductCategories1730000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const categories = [
      { name: 'Remeras', description: 'Prendas superiores livianas, ideales para uso diario.' },
      { name: 'Pantalones', description: 'Desde jeans hasta joggers y pantalones de vestir.' },
      { name: 'Camperas', description: 'Abrigos y chaquetas para distintas estaciones.' },
      { name: 'Calzado', description: 'Zapatillas, botas y sandalias para toda ocasión.' },
      { name: 'Accesorios', description: 'Gorros, bufandas, cinturones, relojes y más.' },
      { name: 'Ropa Deportiva', description: 'Indumentaria técnica y cómoda para entrenar.' },
      { name: 'Ropa Interior', description: 'Boxers, bombachas, corpiños y medias.' },
      { name: 'Vestidos', description: 'Modelos casuales, formales y de temporada.' },
      { name: 'Camisas', description: 'Prendas elegantes para trabajo o eventos.' },
      { name: 'Sweaters', description: 'Abrigos livianos, tejidos y cómodos.' },
    ];

    for (const category of categories) {
      await queryRunner.query(
        `INSERT INTO product_categories (name, description)
         VALUES (?, ?)`,
        [category.name, category.description],
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const names = ['Remeras', 'Pantalones', 'Camperas', 'Calzado', 'Accesorios', 'Ropa Deportiva', 'Ropa Interior', 'Vestidos', 'Camisas', 'Sweaters'];

    await queryRunner.query(`DELETE FROM product_categories WHERE name IN (${names.map(() => '?').join(', ')})`, names);
  }
}
