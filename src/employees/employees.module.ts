import { Module } from '@nestjs/common';
import { EmployeesController } from './controllers/employees.controller';
import { EmployeesService } from './services/employees.service';
import { DepartmentsController } from './controllers/departments.controller';
import { DepartmentsService } from './services/departments.service';
import { ProjectsService } from './services/projects.service';
import { ProjectsController } from './controllers/projects.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { Department } from './entities/department.entity';
import { Project } from './entities/project.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Employee, Department, Project])],
  controllers: [EmployeesController, DepartmentsController, ProjectsController],
  providers: [EmployeesService, DepartmentsService, ProjectsService],
})
export class EmployeesModule {}
