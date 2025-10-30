import { MigrationInterface, QueryRunner } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';

function extractInsertStatements(sql: string, source: 'countries'|'states'|'cities', target: 'staging_countries'|'staging_states'|'staging_cities') {
  return sql
    .split('\n')
    .map(l => l.trim())
    .filter(l => l.startsWith(`INSERT INTO ${source}`) || l.startsWith(`INSERT INTO \`${source}\``))
    .map(l => l.replace(new RegExp(`INSERT INTO\\s+\`?${source}\\\`?`, 'i'), `INSERT INTO ${target}`));
}

export class LoadSqlIntoStaging1732000000010 implements MigrationInterface {
  public async up(q: QueryRunner): Promise<void> {
    const countriesPath = path.resolve('/mnt/data', 'countries.sql'); // ajustá si los movés al repo
    const statesPath = path.resolve('/mnt/data', 'states.sql');

    const countriesSQL = fs.readFileSync(countriesPath, 'utf8');
    const statesSQL = fs.readFileSync(statesPath, 'utf8');

    const countryInserts = extractInsertStatements(countriesSQL, 'countries', 'staging_countries');
    const stateInserts = extractInsertStatements(statesSQL, 'states', 'staging_states');

    const RUN_BATCH = 1; 
    for (let i = 0; i < countryInserts.length; i += RUN_BATCH) {
      await q.query(countryInserts.slice(i, i + RUN_BATCH).join('\n'));
    }
    for (let i = 0; i < stateInserts.length; i += RUN_BATCH) {
      await q.query(stateInserts.slice(i, i + RUN_BATCH).join('\n'));
    }
  }

  public async down(): Promise<void> {

}
}