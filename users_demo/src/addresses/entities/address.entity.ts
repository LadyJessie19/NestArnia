import { User } from 'src/users/users.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
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

  @OneToOne(() => User, (user) => user.address, { onDelete: 'CASCADE' })
  user: User;

  @CreateDateColumn()
  createdAt: Date;
}
