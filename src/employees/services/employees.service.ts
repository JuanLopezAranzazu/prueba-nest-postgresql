import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './../entities/employee.entity';
import { Department } from '../entities/department.entity';
import { CreateEmployeeDto, UpdateEmployeeDto } from './../dtos/employee.dtos';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
    @InjectRepository(Department)
    private departmentRepository: Repository<Department>,
  ) {}

  findAll(): Promise<Employee[]> {
    return this.employeeRepository.find({ relations: ['department'] });
  }

  findOne(id: number): Promise<Employee> {
    const employee = this.employeeRepository.findOne({
      where: { id },
      relations: ['department'],
    });
    if (!employee) {
      throw new NotFoundException(`Employee #${id} not found`);
    }
    return employee;
  }

  async create(payload: CreateEmployeeDto) {
    const { departmentId } = payload;
    const employee = this.employeeRepository.create(payload);
    if (departmentId) {
      const departmentFound = await this.departmentRepository.findOne({
        where: { id: departmentId },
      });
      employee.department = departmentFound;
    }
    await this.employeeRepository.save(employee);
    return employee;
  }

  async update(id: number, payload: UpdateEmployeeDto) {
    const employeeUpdated = {
      id,
      ...payload,
    };
    const employee = await this.employeeRepository.preload(employeeUpdated);
    if (employee) {
      return this.employeeRepository.save(employee);
    }
    throw new NotFoundException(`Employee #${id} not found`);
  }

  async remove(id: number) {
    const employee = await this.employeeRepository.findOne({ where: { id } });
    if (employee) {
      return this.employeeRepository.remove(employee);
    }
    throw new NotFoundException(`Employee #${id} not found`);
  }
}
