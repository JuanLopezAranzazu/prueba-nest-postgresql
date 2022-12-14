import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import { Department } from './department.entity';
import { Project } from './project.entity';
@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  contactNumber: string;

  @CreateDateColumn()
  createdAt: Date;

  // @OneToOne(() => Department)
  // @JoinColumn()
  // department: Department;

  @ManyToOne(() => Department, (department: Department) => department.employees)
  department: Department;

  @ManyToMany(() => Project)
  @JoinTable()
  projects: Project[];
}
