import { PostgresqlModule } from '../pkg/database/postgresql/postgresql.module';
import { ConfigModule as EnvConfigModule } from '@nestjs/config';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as fs from 'fs';

EnvConfigModule.forRoot();
fs.writeFileSync(
  'ormconfig.json',
  JSON.stringify(PostgresqlModule.getTypeOrmConfig(), null, 2),
);
