import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './../entities/employee.entity';
import { Department } from '../entities/department.entity';
import { Project } from './../entities/project.entity';
import { CreateEmployeeDto, UpdateEmployeeDto } from './../dtos/employee.dtos';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
    @InjectRepository(Department)
    private departmentRepository: Repository<Department>,
    @InjectRepository(Project)
    private projectRespository: Repository<Project>,
  ) {}

  findAll(): Promise<Employee[]> {
    return this.employeeRepository.find({
      relations: ['department', 'projects'],
    });
  }

  findOne(id: number): Promise<Employee> {
    const employee = this.employeeRepository.findOne({
      where: { id },
      relations: ['department', 'projects'],
    });
    if (!employee) {
      throw new NotFoundException(`Employee #${id} not found`);
    }
    return employee;
  }

  async create(payload: CreateEmployeeDto) {
    const { departmentId, projectIds } = payload;
    const employee = this.employeeRepository.create(payload);
    if (departmentId) {
      const departmentFound = await this.departmentRepository.findOne({
        where: { id: departmentId },
      });
      employee.department = departmentFound;
    }
    if (projectIds) {
      const projects = await this.projectRespository.findByIds(projectIds);
      employee.projects = projects;
    }
    console.log(employee);
    await this.employeeRepository.save(employee);
    return employee;
  }

  async update(id: number, payload: UpdateEmployeeDto) {
    const employee = await this.findOne(id);
    if (!employee) {
      throw new NotFoundException(`Employee #${id} not found`);
    }
    const { departmentId, projectIds } = payload;
    if (departmentId) {
      const departmentFound = await this.departmentRepository.findOne({
        where: { id: departmentId },
      });
      employee.department = departmentFound;
    }
    if (projectIds) {
      const projects = await this.projectRespository.findByIds(projectIds);
      employee.projects = projects;
    }
    this.employeeRepository.merge(employee, payload);
    return this.employeeRepository.save(employee);
  }

  async remove(id: number) {
    const employee = await this.employeeRepository.findOne({ where: { id } });
    if (employee) {
      return this.employeeRepository.remove(employee);
    }
    throw new NotFoundException(`Employee #${id} not found`);
  }
}
