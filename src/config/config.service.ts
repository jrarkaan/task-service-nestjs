import { Injectable } from '@nestjs/common';
import { ConfigData, ConfigDBData, Server } from './model/config.interface';

@Injectable()
export class ConfigService {
  private config: ConfigData;

  constructor() {}

  public loadDotEnv(): void {
    this.config = this.parsConfigFromEnv(process.env);
  }

  private parsConfigFromEnv(env: NodeJS.ProcessEnv): ConfigData {
    const serverConfiguration: Server = {
      Mode: env.APP_MODE,
      Port: env.APP_PORT,
      NameService: env.APP_NAME,
      Url: env.APP_URL,
    };
    const postgresqlConfiguration: ConfigDBData = {
      Type: 'postgres',
      User: env.DB_USER,
      Pass: env.DB_PASSWORD,
      Name: env.DB_NAME,
      Host: env.DB_HOST,
      Port: env.DB_PORT,
      Dialect: null,
      Charset: null,
      Collate: null,
    };
    return {
      Server: serverConfiguration,
      Db: postgresqlConfiguration,
      LogLevel: 'info',
    };
  }

  public getConfig(): Readonly<ConfigData> {
    return this.config;
  }
}
