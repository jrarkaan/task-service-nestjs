/**
 * Configuration for the database connection.
 */
export interface ConfigDBData {
  Type: string;
  User: string;
  Pass: string;
  Name: string;
  Host: string;
  Port: string;
  Dialect?: string | null;
  Charset?: string | null;
  Collate?: string | null;
}

/**
 *  Configuration data for the app.
 */
export interface Server {
  Mode: string;
  Port: string;
  NameService: string;
  Url: string;
}

/**
 * Configuration data for the app.
 */
export interface ConfigData {
  /** Database connection details. */
  Db?: ConfigDBData;

  /**
   * The log level to use.
   * @example 'verbose', 'info', 'warn', 'error'
   */
  LogLevel: string;
  /**
   *  server information details.
   *  */
  Server?: Server;
}
