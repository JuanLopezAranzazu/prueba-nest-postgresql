import { Module } from '@nestjs/common';
import { EmployeesController } from './controllers/employees.controller';
import { EmployeesService } from './services/employees.service';
import { DepartmentsController } from './controllers/departments.controller';
import { DepartmentsService } from './services/departments.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { Department } from './entities/department.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Employee, Department])],
  controllers: [EmployeesController, DepartmentsController],
  providers: [EmployeesService, DepartmentsService],
})
export class EmployeesModule {}
