// import { PostgresqlModule } from '../pkg/database/postgresql/postgresql.module';
import { ConfigModule as EnvConfigModule } from '@nestjs/config';
import { DataSourceOptions } from 'typeorm';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { join } from 'path';

EnvConfigModule.forRoot();

export function getConfig() {
  return {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    migrationsTableName: 'migrations',
    migrations: [join(__dirname, '../migrations', '*.{ts,js}')],
  } as DataSourceOptions;
}
