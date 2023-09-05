import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { SequelizeModule } from '@nestjs/sequelize';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { LibraryModule } from './library/library.module';

@Module({
  imports: [
    TasksModule,
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'task_management',
      autoLoadModels: true,
      synchronize: true,
    }),
  ],
})
export class AppModule {}
