import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TaskService } from '../Models/task.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Task } from '../Models/task.models';

@Module({
  imports: [SequelizeModule.forFeature([Task])],
  controllers: [TasksController],
  providers: [TasksService, TaskService],
})
export class TasksModule {}
