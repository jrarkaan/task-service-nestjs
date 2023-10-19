import { IsString, Length } from 'class-validator';
export class TaskDto {
  @IsString()
  @Length(3, 149)
  task_description: string;
}
