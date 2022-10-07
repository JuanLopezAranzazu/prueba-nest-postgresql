export class CreateProjectDto {
  readonly name: string;
  readonly startDate: string;
  readonly endDate: string;
}

export class UpdateProjectDto {
  readonly name?: string;
  readonly startDate?: string;
  readonly endDate?: string;
}
