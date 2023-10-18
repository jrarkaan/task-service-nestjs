import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'tasks' })
export class Tasks {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  public id: number;
  @Column({ name: 'uuid', type: 'uuid', nullable: false })
  public uuid: string;
  @Column({
    name: 'task_description',
    type: 'varchar',
    length: 150,
    nullable: false,
  })
  public task_description: string;
  @Column({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: true,
  })
  public created_at: Date;
  @Column({
    name: 'updated_at',
    type: 'timestamptz',
    nullable: true,
  })
  public updated_at: Date;
}
