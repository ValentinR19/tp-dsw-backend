import { MigrationInterface, QueryRunner } from 'typeorm';

export class MergeStagingIntoFinal1732000000100 implements MigrationInterface {
  public async up(q: QueryRunner): Promise<void> {
    await q.query(`
      INSERT INTO countries (id, name, iso3, numeric_code, iso2, capital, currency, currency_name, currency_symbol,
                             region, subregion, latitude, longitude, emoji, emojiU, wikiDataId)
      SELECT id, name, iso3, numeric_code, iso2, capital, currency, currency_name, currency_symbol,
             region, subregion, latitude, longitude, emoji, emojiU, wikiDataId
      FROM staging_countries
      -- si querés solo Argentina: WHERE id = 11
      ON DUPLICATE KEY UPDATE
        name=VALUES(name), iso3=VALUES(iso3), numeric_code=VALUES(numeric_code), iso2=VALUES(iso2),
        capital=VALUES(capital), currency=VALUES(currency), currency_name=VALUES(currency_name),
        currency_symbol=VALUES(currency_symbol), region=VALUES(region), subregion=VALUES(subregion),
        latitude=VALUES(latitude), longitude=VALUES(longitude), emoji=VALUES(emoji), emojiU=VALUES(emojiU),
        wikiDataId=VALUES(wikiDataId);
    `);

    await q.query(`
      INSERT INTO states (id, name, country_id, country_code, fips_code, iso2, type, latitude, longitude, wikiDataId)
      SELECT id, name, country_id, country_code, fips_code, iso2, type, latitude, longitude, wikiDataId
      FROM staging_states
      -- solo provincias de AR: WHERE country_id = 11
      ON DUPLICATE KEY UPDATE
        name=VALUES(name), country_id=VALUES(country_id), country_code=VALUES(country_code),
        fips_code=VALUES(fips_code), iso2=VALUES(iso2), type=VALUES(type),
        latitude=VALUES(latitude), longitude=VALUES(longitude), wikiDataId=VALUES(wikiDataId);
    `);

    await q.query(`
      INSERT INTO cities (id, name, state_id, state_code, country_id, wikiDataId)
      SELECT id, name, state_id, state_code, country_id, wikiDataId
      FROM staging_cities
      -- solo AR: WHERE country_id = 11
      ON DUPLICATE KEY UPDATE
        name=VALUES(name), state_id=VALUES(state_id), state_code=VALUES(state_code),
        country_id=VALUES(country_id), wikiDataId=VALUES(wikiDataId);
    `);
  }

  public async down(q: QueryRunner): Promise<void> {
    await q.query(`DELETE c FROM countries c JOIN staging_countries s ON s.id=c.id;`);
    await q.query(`DELETE s2 FROM states s2 JOIN staging_states s ON s.id=s2.id;`);
    await q.query(`DELETE c2 FROM cities c2 JOIN staging_cities s ON s.id=c2.id;`);
  }
}
