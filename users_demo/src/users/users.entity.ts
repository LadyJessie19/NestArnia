import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { IsEmail, Length, MinLength } from 'class-validator';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  @IsEmail()
  @Length(3, 50)
  email: string;

  @Column()
  @MinLength(3)
  password: string;

  @CreateDateColumn()
  createdAt: Date;
}
