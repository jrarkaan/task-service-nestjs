import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableTask1697648214787 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
            create table tasks(
                id               bigserial primary key,
                uuid             uuid not null,
                task_description varchar(150) default null,
                created_at       timestamp with time zone default CURRENT_TIMESTAMP not null,
                updated_at       timestamp with time zone
            );
        `,
    );
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
            drop table if exists tasks;
        `,
    ); // reverts things made in "up" method
  }
}
