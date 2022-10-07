import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from '../entities/project.entity';
import { CreateProjectDto, UpdateProjectDto } from './../dtos/project.dtos';

import formatDate from './../../utils/formatDate';
const { extractFormatDate } = formatDate;

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
  ) {}

  findAll(): Promise<Project[]> {
    return this.projectRepository.find({ relations: ['employees'] });
  }

  findOne(id: number): Promise<Project> {
    const project = this.projectRepository.findOne({
      where: { id },
      relations: ['employees'],
    });
    if (!project) {
      throw new NotFoundException(`Project #${id} not found`);
    }
    return project;
  }

  async create(payload: CreateProjectDto) {
    const { name, startDate, endDate } = payload;
    const dataForProject = {
      name,
      startDate: extractFormatDate(startDate),
      endDate: extractFormatDate(endDate),
    };
    const project = this.projectRepository.create(dataForProject);
    await this.projectRepository.save(project);
    return project;
  }

  async update(id: number, payload: UpdateProjectDto) {
    const { name, startDate, endDate } = payload;
    const dataForProject = {
      name,
      startDate: extractFormatDate(startDate),
      endDate: extractFormatDate(endDate),
    };
    const projectUpdated = {
      id,
      ...dataForProject,
    };
    const project = await this.projectRepository.preload(projectUpdated);
    if (project) {
      return this.projectRepository.save(project);
    }
    throw new NotFoundException(`Project #${id} not found`);
  }

  async remove(id: number) {
    const project = await this.projectRepository.findOne({ where: { id } });
    if (project) {
      return this.projectRepository.remove(project);
    }
    throw new NotFoundException(`Project #${id} not found`);
  }
}
