export class PostgresqlError extends Error {
  public constructor(message = 'Unknown database error') {
    super(message);
  }
}
export class PostgresqlConfigError extends PostgresqlError {
  public constructor(message = 'Database configuration error') {
    super(message);
  }
}
