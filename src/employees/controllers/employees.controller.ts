import {
  Controller,
  Get,
  Query,
  Param,
  Post,
  Body,
  Put,
  Delete,
  HttpStatus,
  HttpCode,
  Res,
  ParseIntPipe,
} from '@nestjs/common';

import { Response } from 'express';
import { CreateEmployeeDto, UpdateEmployeeDto } from './../dtos/employee.dtos';
import { EmployeesService } from './../services/employees.service';

@Controller('employees')
export class EmployeesController {
  constructor(private employeeService: EmployeesService) {}

  @Get()
  getEmployees() {
    return this.employeeService.findAll();
  }
  @Get(':employeeId')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('employeeId', ParseIntPipe) employeeId: number) {
    return this.employeeService.findOne(employeeId);
  }

  @Post()
  create(@Body() payload: CreateEmployeeDto) {
    return this.employeeService.create(payload);
  }

  @Put(':employeeId')
  update(
    @Param('employeeId', ParseIntPipe) employeeId: number,
    @Body() payload: UpdateEmployeeDto,
  ) {
    return this.employeeService.update(employeeId, payload);
  }

  @Delete(':employeeId')
  delete(@Param('employeeId', ParseIntPipe) employeeId: number) {
    return this.employeeService.remove(employeeId);
  }
}
