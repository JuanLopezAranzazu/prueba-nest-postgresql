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
import { CreateProjectDto, UpdateProjectDto } from './../dtos/project.dtos';
import { ProjectsService } from './../services/projects.service';

@Controller('projects')
export class ProjectsController {
  constructor(private projectService: ProjectsService) {}

  @Get()
  getProjects() {
    return this.projectService.findAll();
  }
  @Get(':projectId')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('projectId', ParseIntPipe) projectId: number) {
    return this.projectService.findOne(projectId);
  }

  @Post()
  create(@Body() payload: CreateProjectDto) {
    return this.projectService.create(payload);
  }

  @Put(':projectId')
  update(
    @Param('projectId', ParseIntPipe) projectId: number,
    @Body() payload: UpdateProjectDto,
  ) {
    return this.projectService.update(projectId, payload);
  }

  @Delete(':projectId')
  delete(@Param('projectId', ParseIntPipe) projectId: number) {
    return this.projectService.remove(projectId);
  }
}
