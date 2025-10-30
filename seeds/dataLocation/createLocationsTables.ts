import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateStagingTables1732000000000 implements MigrationInterface {
  public async up(q: QueryRunner): Promise<void> {
    // países
    await q.query(`
      CREATE TABLE IF NOT EXISTS staging_countries (
        id INT UNSIGNED PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        iso3 CHAR(3), iso2 CHAR(2),
        numeric_code VARCHAR(10),
        phonecode VARCHAR(32),
        capital VARCHAR(255),
        currency VARCHAR(64),
        currency_name VARCHAR(128),
        currency_symbol VARCHAR(16),
        tld VARCHAR(16),
        native VARCHAR(255),
        region VARCHAR(255),
        subregion VARCHAR(255),
        latitude VARCHAR(64),
        longitude VARCHAR(64),
        emoji VARCHAR(16),
        emojiU VARCHAR(32),
        wikiDataId VARCHAR(64)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    // estados/provincias
    await q.query(`
      CREATE TABLE IF NOT EXISTS staging_states (
        id INT UNSIGNED PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        country_id INT UNSIGNED NOT NULL,
        country_code CHAR(2),
        fips_code VARCHAR(16),
        iso2 VARCHAR(16),
        iso3166_2 VARCHAR(16),
        type VARCHAR(191),
        latitude VARCHAR(64),
        longitude VARCHAR(64),
        timezone VARCHAR(191),
        wikiDataId VARCHAR(64)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    // ciudades (por si luego agregás cities.sql)
    await q.query(`
      CREATE TABLE IF NOT EXISTS staging_cities (
        id INT UNSIGNED PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        state_id INT UNSIGNED NOT NULL,
        state_code VARCHAR(16),
        country_id INT UNSIGNED NOT NULL,
        country_code CHAR(2),
        latitude VARCHAR(64),
        longitude VARCHAR(64),
        wikiDataId VARCHAR(64)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);
  }

  public async down(q: QueryRunner): Promise<void> {
    await q.query(`DROP TABLE IF EXISTS staging_cities`);
    await q.query(`DROP TABLE IF EXISTS staging_states`);
    await q.query(`DROP TABLE IF EXISTS staging_countries`);
  }
}
