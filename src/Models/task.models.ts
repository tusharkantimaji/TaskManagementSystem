import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Task extends Model {
  // @Column({
  //   primaryKey: true,
  //   allowNull: false,
  // })
  // id: string;

  @Column({
    allowNull: false,
  })
  title: string;

  @Column({
    allowNull: false,
  })
  description: string;

  @Column({
    allowNull: false,
  })
  status: TaskStatus;
}

export enum TaskStatus {
  OPEN = 'OPEN',
  IN_PROGESS = 'IN_PROGESS',
  DONE = 'DONE',
}
