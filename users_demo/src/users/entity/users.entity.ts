import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import * as bcrypt from 'bcrypt';

import { IsEmail, Length, MinLength } from 'class-validator';
import { Address } from 'src/addresses/entities/address.entity';
import { Pet } from 'src/pets/entities/pet.entity';
import { Event } from 'src/events/entities/event.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  @IsEmail()
  @Length(3, 50)
  email: string;

  @Column({ select: false })
  @MinLength(3)
  password: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @OneToOne(() => Address, (address) => address.user, {
    cascade: true,
    nullable: false,
  })
  @JoinColumn({ name: 'address_id' })
  address: Address;

  @OneToMany(() => Pet, (pet) => pet.user)
  pets: Pet[];

  @ManyToMany(() => Event, (event) => event.participants)
  events: Event[];

  @BeforeInsert()
  async encryptPassword() {
    try {
      this.password = await bcrypt.hash(this.password, 10);
    } catch (error) {
      throw new Error(error);
    }
  }
}
