import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Department } from './../entities/department.entity';
import {
  CreateDepartmentDto,
  UpdateDepartmentDto,
} from './../dtos/department.dtos';

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectRepository(Department)
    private departmentRepository: Repository<Department>,
  ) {}

  findAll(): Promise<Department[]> {
    return this.departmentRepository.find({ relations: ['employees'] });
  }

  findOne(id: number): Promise<Department> {
    const department = this.departmentRepository.findOne({
      where: { id },
      relations: ['employees'],
    });
    if (!department) {
      throw new NotFoundException(`Department #${id} not found`);
    }
    return department;
  }

  async create(payload: CreateDepartmentDto) {
    const department = this.departmentRepository.create(payload);
    await this.departmentRepository.save(department);
    return department;
  }

  async update(id: number, payload: UpdateDepartmentDto) {
    const departmentUpdated = {
      id,
      ...payload,
    };
    const department = await this.departmentRepository.preload(
      departmentUpdated,
    );
    if (department) {
      return this.departmentRepository.save(department);
    }
    throw new NotFoundException(`Department #${id} not found`);
  }

  async remove(id: number) {
    const department = await this.departmentRepository.findOne({
      where: { id },
    });
    if (department) {
      return this.departmentRepository.remove(department);
    }
    throw new NotFoundException(`Department #${id} not found`);
  }
}
