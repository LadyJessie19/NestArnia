import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('addresses')
export class Address {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  street: string;

  @Column({ nullable: false })
  city: string;

  @Column({ nullable: false, length: 8 })
  zipCode: string;

  @CreateDateColumn()
  createdAt: Date;
}
