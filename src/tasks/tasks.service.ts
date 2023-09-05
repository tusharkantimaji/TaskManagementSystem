import { Injectable } from '@nestjs/common';
// import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

// import { Injectable } from "@nestjs/common";
// import { InjectModel } from '@nestjs/sequelize';
import { Task, TaskStatus } from '../Models/task.models';
import { TaskService } from '../Models/task.service';

@Injectable()
export class TasksService {
  constructor(private readonly mytaskService: TaskService) {}
  // private tasks: Task[] = [];

  public async getAllTasks(): Promise<Task[]> {
    // return this.tasks;
    const allTasks = await this.mytaskService.findAll();
    console.log('allTask = ', allTasks);
    return allTasks;
  }

  public async getTasksWithFilter(
    filterDto: GetTasksFilterDto,
  ): Promise<Task[]> {
    const { status, search } = filterDto;

    let tasks = await this.getAllTasks();

    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }

    if (search) {
      tasks = tasks.filter((task) => {
        if (task.title.includes(search) || task.description.includes(search)) {
          return true;
        }
        return false;
      });
    }

    return tasks;
  }

  public async getTaskById(id: string): Promise<Task> {
    const task = await this.mytaskService.findOne(id);
    return task;
  }

  // createTask(title: string, description: string): Task {

  public async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;
    const task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
      // ...Task,
      // createdAt: now(),
      // updatedAt: now(),
    };
    const newTask = await this.mytaskService.createTask(task);
    // this.tasks.push(task);
    return newTask;
  }

  deleteById(id: string): Promise<void> {
    this.mytaskService.deleteById(id);
    return;
  }

  public async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    const task = await this.mytaskService.updateStatusById(id, status);
    return task;
  }
}
