import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';

import { Employee } from './employee.entity';

@Entity()
export class Department {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  // @OneToOne(() => Employee, (employee: Employee) => employee.department)
  // employee: Employee;

  @OneToMany(() => Employee, (employee: Employee) => employee.department)
  employees: Employee[];
}
