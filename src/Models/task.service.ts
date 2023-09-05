import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Task } from '../Models/task.models';
import { TaskStatus } from 'src/tasks/task.model';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task)
    private taskModel: typeof Task,
  ) {}

  async findAll(): Promise<Task[]> {
    return this.taskModel.findAll();
  }

  async findOne(id: string): Promise<Task> {
    return this.taskModel.findOne({
      where: {
        id,
      },
    });
  }

  async createTask(task): Promise<Task> {
    return this.taskModel.create({ ...task });
  }

  async deleteById(id: string): Promise<void> {
    this.taskModel.destroy({
      where: {
        id,
      },
    });
  }

  async updateStatusById(id: string, status: TaskStatus): Promise<Task> {
    await this.taskModel.update(
      { status: status },
      { where: { id }, returning: true },
    );
    return this.findOne(id);
    // return a
    // return this.taskModel.findOne({
    //   where: {
    //     id,
    //   },
    // });
  }
}
