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
import {
  CreateDepartmentDto,
  UpdateDepartmentDto,
} from './../dtos/department.dtos';
import { DepartmentsService } from './../services/departments.service';

@Controller('departments')
export class DepartmentsController {
  constructor(private departmentService: DepartmentsService) {}

  @Get()
  getEmployees() {
    return this.departmentService.findAll();
  }
  @Get(':departmentId')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('departmentId', ParseIntPipe) departmentId: number) {
    return this.departmentService.findOne(departmentId);
  }

  @Post()
  create(@Body() payload: CreateDepartmentDto) {
    return this.departmentService.create(payload);
  }

  @Put(':departmentId')
  update(
    @Param('departmentId', ParseIntPipe) departmentId: number,
    @Body() payload: UpdateDepartmentDto,
  ) {
    return this.departmentService.update(departmentId, payload);
  }

  @Delete(':departmentId')
  delete(@Param('departmentId', ParseIntPipe) departmentId: number) {
    return this.departmentService.remove(departmentId);
  }
}
