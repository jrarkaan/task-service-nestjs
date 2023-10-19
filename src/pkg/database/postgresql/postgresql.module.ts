import { Module, DynamicModule } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigDBData } from '../../../app/config/model/config.interface';
import { ConfigModule } from '../../../app/config/config.module';
import { ConfigService } from '../../../app/config/config.service';
import { PostgresqlConfig } from './model/postgresql.interface';
import { PostgresqlConfigError } from './exception/postgresql.error';

@Module({})
export class PostgresqlModule {
  static forRoot(dbconfig: PostgresqlConfig): DynamicModule {
    return {
      global: true,
      module: PostgresqlModule,
      imports: [
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          useFactory: (configService: ConfigService) =>
            PostgresqlModule.getConnectionOptions(configService, dbconfig),
          inject: [ConfigService],
        }),
      ],
    };
  }
  public static getConnectionOptions(
    config: ConfigService,
    dbconfig: PostgresqlConfig,
  ): TypeOrmModuleOptions {
    const dbConfiguration: ConfigDBData = config.getConfig().Db;
    let connectionOptions: TypeOrmModuleOptions;

    if (!dbConfiguration) {
      throw new PostgresqlConfigError('Database config is missing');
    }
    // eslint-disable-next-line prefer-const
    connectionOptions = this.getConnectionOptionsPG(dbConfiguration);

    return {
      ...connectionOptions,
      entities: dbconfig.entities,
      logging: true,
      extra: {
        validateConnection: false,
        trustServerCertificate: true,
      },
    };
  }
  public static getTypeOrmConfig(): TypeOrmModuleOptions {
    console.info(`env: ${process.env.DB_HOST}`);
    return {
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      migrationsTableName: 'migration',
      migrations: ['src/migration/*.ts'],
    };
  }
  private static getConnectionOptionsPG(
    db: ConfigDBData,
  ): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: process.env.DB_HOST || db.Host,
      port: +process.env.DB_PORT || parseInt(db.Port, 10),
      username: process.env.DB_USER || db.User,
      password: process.env.DB_PASSWORD || db.Pass,
      database: process.env.DB_NAME || db.Name,
      migrationsTableName: 'migration',
      migrations: ['src/migration/*.ts'],
    };
  }
}
