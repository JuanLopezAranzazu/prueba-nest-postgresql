export class CreateEmployeeDto {
  readonly name: string;
  readonly email: string;
  readonly contactNumber: string;
  readonly departmentId: number;
}

export class UpdateEmployeeDto {
  readonly name?: string;
  readonly email?: string;
  readonly contactNumber?: string;
  readonly departmentId?: number;
}
